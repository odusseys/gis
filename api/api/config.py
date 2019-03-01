import os
import re

CONFIG_KEYS = [
    "USER_AUTH_SECRET",
    "ADMIN_AUTH_SECRET",
    "SQLALCHEMY_DATABASE_URI",
    "AWS_DEFAULT_REGION",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY"
]

config = {}

parsed_config = {}
try:
    folder = os.path.dirname(__file__)
    with open(os.path.join(folder, ".env")) as env_file:
        for line in env_file.readlines():
            match = re.search("^([^=]+)=(.+)$", line)
            parsed_config[match.group(1)] = match.group(2)
except:
    pass
for key in CONFIG_KEYS:
    if key in os.environ:
        config[key] = os.environ[key]
    elif key in parsed_config:
        config[key] = parsed_config[key]
    else:
        raise ValueError(f"Missing key in environment: {key}")
print("Parsed config", config)
