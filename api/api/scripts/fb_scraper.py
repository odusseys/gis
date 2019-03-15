import requests
import asyncio
import os
import pytz
import concurrent
import logging
import json
from dateutil.parser import parse
from bs4 import BeautifulSoup
from api.models import Event, Place
from unidecode import unidecode
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime, timedelta
from api.config import config
import api.clients.db

BASE_URL = "https://graph.facebook.com/v3.2/doctorloveparis?access_token=805948712929631|YMxL0D9coS4IjEz5qWsQ4VGI3ko"

req = requests.get(BASE_URL)
req.encoding = "utf-8"
page = req.text
soup = BeautifulSoup(page, "html5lib")
print(soup)
