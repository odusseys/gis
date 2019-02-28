import os
import re

config = {}

try:
    folder = os.path.dirname(__file__)
    with open(os.path.join(folder, ".env")) as env_file:
        for line in env_file.readlines():
            match = re.search("^([^=]+)=(.+)$", line)
            config[match.group(1)] = match.group(2)
        print(config)
except:
    raise ValueError("No .env file found in api folder")
