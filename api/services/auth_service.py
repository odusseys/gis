from cryptography.fernet import Fernet
import phonenumbers
import hashlib
from phonenumbers.phonenumberutil import NumberParseException
import jwt
from api.config import config
from api.util.exceptions import Conflict, BadRequest, Unauthorized
from api.db import session_scope
from api.models.user_models import User, UserContact

CIPHER = Fernet(config["ENCRYPTION_KEY"])


def generate_auth_token(user_id):
    return jwt.encode(dict(user_id=user_id), config["USER_AUTH_SECRET"], algorithm="HS256").decode("utf-8")


def get_user_from_token(token):
    try:
        jwt.decode(token, config["USER_AUTH_SECRET"], algorithm="HS256")[
            "user_ud"]
    except:
        raise Unauthorized()


def user_to_dict(user):
    return dict(
        id=user.id,
        name=user.name,
        token=generate_auth_token(user.id)
    )


def normalize_number(phone_number):
    if "number" not in phone_number:
        raise BadRequest("Missing 'number' in phone_number")
    parsed = phonenumbers.parse(
        phone_number["number"], phone_number.get("region"))
    return phonenumbers.format_number(
        parsed, phonenumbers.PhoneNumberFormat.E164)


def encrypt_number(number):
    return CIPHER.encrypt(number.encode("utf-8")).decode("utf-8")


def hash_number(number):
    m = hashlib.sha3_512()
    m.update(number.encode("utf-8"))
    return m.hexdigest()


def _import_contacts_nt(session, user_id, contacts):
    for contact in contacts:
        try:
            hashed_phone_number = hash_number(
                normalize_number(contact["phone_number"]))
            contact = UserContact(
                user_id=user_id,
                imported_name=contact["name"],
                hashed_phone_number=hashed_phone_number
            )
            session.add(contact)
        except NumberParseException:
            continue


def signup(name, phone_number, contacts):
    normalized = normalize_number(phone_number)
    try:
        encrypted_phone_number = encrypt_number(normalized)
    except NumberParseException:
        raise BadRequest("INVALID_NUMBER")
    hashed_phone_number = hash_number(normalized)
    with session_scope() as session:
        user = session.query(User).filter(
            User.hashed_phone_number == hashed_phone_number).first()
        if user is not None:
            raise Conflict("An user with this number exists.")
        user = User(
            name=name,
            encrypted_phone_number=encrypted_phone_number,
            hashed_phone_number=hashed_phone_number
        )
        session.add(user)
        session.flush()
        _import_contacts_nt(session, user.id, contacts)
        session.flush()
        auth_info = user_to_dict(user)
    return auth_info


def signin(number):


def get_friends(user_id):
    with session_scope() as session:
        friends = session.query(User).filter(
            User.id == UserContact.user_id, UserContact.user_id == user_id).all()
        return [dict(name=u.name) for u in friends]
