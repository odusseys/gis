import spacy
import csv
import requests
import asyncio
import os
import pytz
import concurrent
import logging
from dateutil.parser import parse
from bs4 import BeautifulSoup
from api.models import Event, Place
from unidecode import unidecode
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime, timedelta
from api.config import config
import api.clients.db

print('loading model')
nlp = spacy.load('en')
print('loaded model')


def make_session():
    engine = create_engine(config["SQLALCHEMY_DATABASE_URI"])
    Session = sessionmaker()
    Session.configure(bind=engine)
    return Session()


session = make_session()

descs = session.query(Event.description).limit(1).all()
for (d,) in descs:
    print(d)
    doc = nlp(d)
    for token in doc:
        print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
              token.shape_, token.is_alpha, token.is_stop)
    arr = doc.vector
    print(arr)


session.close()
