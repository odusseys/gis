from api.models.user_models import User, UserContact
from cryptography.fernet import Fernet
from api.config import config
from api.util.exceptions import Conflict
from api.db import session_scope

cipher = Fernet(config["ENCRYPTION_KEY"])


def clean_and_encrypt_number(phone_number):
    # todo: validate and sanitize number.
    return cipher.encrypt(phone_number).encode("utf-8")


def signup(name, phone_number, contacts):
    encrypted_phone_number = clean_and_encrypt_number(phone_number)

    with session_scope() as session:
        u = session.query(User).filter(
            User.encrypted_phone_number == encrypted_phone_number).first()
        if u is not None:
            raise Conflict("An user with this number exists.")
        u = User(name=name, encrypted_phone_number=encrypted_phone_number)
        session.add(u)
        session.flush
        user_id = u.id
        for contact in contacts:
            encrypted_phone_number = clean_and_encrypt_number(phone_number)
            contact = UserContact(
                user_id=user_id, encrypted_phone_number=encrypted_phone_number)
            session.add(contact)
