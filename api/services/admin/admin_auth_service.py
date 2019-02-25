import re
import jwt
from passlib.hash import pbkdf2_sha256
from functools import wraps
from flask import request

from api.models import AdminUser
from api.clients.db import session_scope
from api.util.exceptions import BadRequest, Unauthorized, Conflict
from api.util.logging import get_logger
from api.config import config

LOGGER = get_logger(__name__)


def _get_token(user):
    return jwt.encode(dict(user_id=user.id, is_super_admin=user.is_super_admin),
                      config['ADMIN_AUTH_SECRET'],
                      algorithm='HS256').decode('utf-8')


def _user_auth_info(user):
    return dict(first_name=user.first_name,
                last_name=user.last_name,
                id=user.id,
                is_super_admin=user.is_super_admin,
                token=_get_token(user))


def create_user(first_name: str, last_name: str, email: str, password: str, is_super_admin: bool):
    with session_scope() as session:
        user = session.query(AdminUser).filter(
            AdminUser.email == email).first()
        if user is not None:
            raise Conflict("EMAIL_IN_USE")
        hashed_password = pbkdf2_sha256.hash(password)
        user = AdminUser(first_name=first_name,
                         last_name=last_name,
                         email=email,
                         hashed_password=hashed_password,
                         is_super_admin=is_super_admin)
        session.add(user)
        session.flush()
        return _user_auth_info(user)


def admin_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if auth is None:
            raise Unauthorized(payload="NO_AUTHORIZATION_HEADER")
        match = re.search("^Bearer (.*)$", auth)
        if match is None:
            raise Unauthorized(payload="INVALID_AUTHORIZATION_HEADER")
        token = match.group(1)
        try:
            payload = jwt.decode(token, ADMIN_JWT_SECRET, algorithms=['HS256'])
        except jwt.exceptions.PyJWTError:
            raise Unauthorized(payload="INVALID_TOKEN_FORMAT")
        if "account_id" not in payload:
            raise Unauthorized(payload="INVALID_TOKEN")

        return f(*args, **kwargs)

    return wrapper


def login_user(email: str, password: str):
    with session_scope() as session:
        user = session.query(AdminUser).filter(
            AdminUser.email == email
        ).first()
        if user is None:
            raise Unauthorized(payload="USER_NOT_FOUND")
        if not pbkdf2_sha256.verify(password, user.hashed_password):
            raise Unauthorized(payload="INVALID_PASSWORD")
        return _user_auth_info(user)


def list_users():
    with session_scope() as session:
        res = session.query(AdminUser).all()
        return [dict(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
        ) for user in res]
