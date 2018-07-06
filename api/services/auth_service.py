from cryptography.fernet import Fernet
import phonenumbers
import hashlib
from phonenumbers.phonenumberutil import NumberParseException
import jwt
from random import randint
from api.config import config
from api.util.exceptions import Conflict, BadRequest, Unauthorized
from api.clients.db import session_scope
from api.models.user_models import User, UserContact
from api.clients.redis import cached
from api.clients.sms import post_message

CIPHER = Fernet(config["ENCRYPTION_KEY"])

I18N = dict(
    FR="Votre code de vérification pour GIS est {}",
    EN="Your verification code for GIS is {}"
)


def generate_auth_token(user_id):
    payload = dict(user_id=user_id)
    secret = config["USER_AUTH_SECRET"]
    return jwt.encode(payload, secret, algorithm="HS256").decode("utf-8")


def get_user_from_token(token):
    try:
        jwt.decode(token, config["USER_AUTH_SECRET"],
                   algorithm="HS256")["user_id"]
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
    m = hashlib.sha3_512()  # pylint: disable
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


@cached(region="phone-verification", ttl=300)
def get_phone_verification_code(encrypted_phone_number):
    return randint(100000, 999999)


def verification(phone_number, language):
    if language not in I18N:
        raise BadRequest("Unsupported language")
    normalized = normalize_number(phone_number)
    try:
        encrypted_phone_number = encrypt_number(normalized)
    except NumberParseException:
        raise BadRequest("INVALID_NUMBER")
    code = get_phone_verification_code(encrypted_phone_number)
    message = I18N[language].format(code)
    post_message(normalized, message)


def signup(name, phone_number, verification_code):
    normalized = normalize_number(phone_number)
    actual_code = get_phone_verification_code(normalized)
    if verification_code != actual_code:
        raise BadRequest("Wrong verification code, or it has expired")
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
        auth_info = user_to_dict(user)
    return auth_info
