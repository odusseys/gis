import json
import os
config = None

try:
    folder = os.path.dirname(__file__)
    with open(os.path.join(folder, "config.json")) as config_file:
        config = json.load(config_file)
except:
    raise ValueError("No config.json file found in api folder")
