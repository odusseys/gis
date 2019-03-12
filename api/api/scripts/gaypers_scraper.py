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

URL = "https://gaypers.com"

DATE_LIMIT = datetime.now() + timedelta(days=61)


def get_page_soup(url):
    req = requests.get(url)
    req.encoding = "utf-8"
    page = req.text
    return BeautifulSoup(page, "html5lib")


soup = get_page_soup(URL + "/fr/Paris")
cards = soup.find_all(class_="col-lg-3 col-md-4 col-sm-6 col-xs-6")
links = ["{}{}".format(URL, c.a["href"]) for c in cards]


def to_slug(s):
    return unidecode(s).lower()


class ScrapeResult:
    def __init__(self, name, place, place_address, image_url, start_time, end_time, description):
        self.name = name
        self.place = place
        self.place_address = place_address
        self.image_url = image_url
        self.start_time = start_time
        self.end_time = end_time
        self.description = description
        self.identifier = to_slug("{}-{}".format(name, str(self.start_time)))
        self.place_identifier = to_slug(place)

    def is_valid(self):
        return self.name is not None and self.place is not None and self.start_time is not None

    def __repr__(self):
        return f"ScrapeResult({self.name}, {self.place}, {self.place_address}, {self.start_time}, {self.end_time})"


def parse_time(t):
    r = parse(t)
    r = r.replace(tzinfo=pytz.timezone("Europe/Paris"))
    return r


def scrape_event(url):
    try:
        soup = get_page_soup(url)
        json_data = soup.find('script', dict(type="application/ld+json")).text
        json_data = json.loads(json_data)
        title = soup.find(id="h1col1").string
        image_url = json_data["image"]
        start_time = parse(json_data["startDate"])
        end_time = parse(json_data["endDate"])
        details = list(soup.find(class_="det").find_all('tr'))
        place = details[1].find_all("td")[1].string
        try:
            place_address = details[2].find_all("td")[1].contents[0][:-3]
        except:
            place_address = None
        try:
            description = "\n".join(list(soup.find(class_="ww").strings))
        except:
            description = ""
        return ScrapeResult(title, place, place_address,
                            image_url, start_time, end_time, description)
    except:
        logging.exception("Failed to parse {}".format(url))
        return None


def handle_places(session, results: [ScrapeResult]):
    place_dict = {r.place_identifier: r for r in results}
    existing = session.query(Place).all()
    for e in existing:
        if e.identifier in place_dict:
            del place_dict[e.identifier]
    to_add = [Place(name=v.place, identifier=k, address=v.place_address)
              for k, v in place_dict.items()]
    session.add_all(to_add)
    session.flush()
    return {p.identifier: p.id for p in existing + to_add}


def handle_events(session, results: [ScrapeResult], place_dict):
    identifiers = set(r.identifier for r in results)
    existing = session.query(Event.identifier).filter(
        Event.identifier.in_(identifiers)).all()
    existing = set(x[0] for x in existing)
    for r in results:
        if r.identifier not in existing:
            session.add(Event(name=r.name,
                              description=r.description,
                              place_id=place_dict[r.place_identifier],
                              start_date=r.start_time,
                              end_date=r.end_time,
                              image_url=r.image_url,
                              identifier=r.identifier))


def handle_results(session, results: [ScrapeResult]):
    try:
        results = [r for r in results if r is not None and r.is_valid()]
        place_dict = handle_places(session, results)
        handle_events(session, results, place_dict)
        session.commit()
    except:
        session.rollback()
        logging.exception("FAILED TO SCRAPE")


def make_session():
    engine = create_engine(config["SQLALCHEMY_DATABASE_URI"])
    Session = sessionmaker()
    Session.configure(bind=engine)
    return Session()


async def main():
    session = make_session()
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:

        loop = asyncio.get_event_loop()
        futures = [
            loop.run_in_executor(
                executor,
                scrape_event,
                url
            )
            for url in links
        ]
        res = []
        for response in await asyncio.gather(*futures):
            res.append(response)
        handle_results(session, res)
    session.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
