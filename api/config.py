import os


def get_env(v):
    env = os.environ.get(v)
    if env is None:
        raise ValueError("Missing in environment : {}".format(v))
    return env


env = ['SQLALCHEMY_DATABASE_URI', 'ENCRYPTION_KEY']

config = {v: get_env(v) for v in env}
