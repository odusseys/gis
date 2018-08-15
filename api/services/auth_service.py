from cryptography.fernet import Fernet
import phonenumbers
import hashlib
from phonenumbers.phonenumberutil import NumberParseException
import jwt
from jwt import DecodeError
from flask import g
from random import randint
from api.config import config
from api.util.exceptions import Conflict, BadRequest, Unauthorized
from api.clients.db import session_scope
from api.models.user_models import User, UserContact
from api.clients.redis import cached
from api.clients.sms import post_message
from api.util.requests import get_required_value
from functools import wraps


I18N = dict(
    FR="Votre code de vérification pour Kiki est {}",
    EN="Your verification code for Kiki is {}"
)


def generate_auth_token(user_id):
    payload = dict(user_id=user_id)
    secret = config["USER_AUTH_SECRET"]
    return jwt.encode(payload, secret, algorithm="HS256").decode("utf-8")


def get_user_from_token(token):
    try:
        user_id = jwt.decode(token, config["USER_AUTH_SECRET"],
                             algorithm="HS256")["user_id"]
        with session_scope() as session:
            user = session.query(User).filter(User.id == user_id).first()
            if user is None:
                raise Unauthorized()
            return user
    except DecodeError:
        raise Unauthorized()
    except KeyError:
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


def hash_number(number):
    m = hashlib.sha3_512()  # pylint: disable
    m.update(number.encode("utf-8"))
    return m.hexdigest()


# todo: actually do :/
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
def get_phone_verification_code(normalized_phone_number):
    return randint(100000, 999999)


def verification(phone_number, language="EN", check_user=False):
    if language not in I18N:
        raise BadRequest("Unsupported language")
    normalized_phone_number = normalize_number(phone_number)
    if check_user:
        with session_scope() as session:
            user = session.query(User).filter(
                User.normalized_phone_number == normalized_phone_number
            ).first()
            if user is None:
                raise Unauthorized()
    code = get_phone_verification_code(normalized_phone_number)
    message = I18N[language].format(code)
    post_message(normalized_phone_number, message)


def signup(name, phone_number, verification_code):
    normalized_phone_number = normalize_number(phone_number)
    actual_code = get_phone_verification_code(normalized_phone_number)
    if verification_code != actual_code:
        raise BadRequest("Wrong verification code, or it has expired")

    with session_scope() as session:
        user = session.query(User).filter(
            User.normalized_phone_number == normalized_phone_number).first()
        if user is not None:
            raise Conflict("An user with this number exists.")
        user = User(
            name=name,
            normalized_phone_number=normalized_phone_number
        )
        session.add(user)
        session.flush()
        auth_info = user_to_dict(user)
    return auth_info


def login(phone_number, verification_code):
    normalized_phone_number = normalize_number(phone_number)
    actual_code = get_phone_verification_code(normalized_phone_number)
    if verification_code != actual_code:
        raise Unauthorized()
    with session_scope() as session:
        user = session.query(User).filter(
            User.normalized_phone_number == normalized_phone_number).first()
        if user is None:
            raise Unauthorized()
        return user_to_dict(user)


def requires_user_auth(f):
    @wraps(f)
    def wrap(*x, **y):
        token = get_required_value("token")
        if token is None:
            raise Unauthorized()
        g.user = get_user_from_token(token)
        return f(*x, **y)
    return wrap
