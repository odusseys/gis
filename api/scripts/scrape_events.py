import requests
import asyncio
import os
import concurrent
from dateutil.parser import parse
from bs4 import BeautifulSoup
from api.models import Event, Place
from unidecode import unidecode
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy import create_engine

URL = "https://gaypers.com"

page = requests.get(URL + "/Paris").text

soup = BeautifulSoup(page, "html.parser")

cards = soup.find_all(class_="col-lg-3 col-md-4 col-sm-6 col-xs-6")
links = ["{}{}".format(URL, c.a["href"]) for c in cards]


def to_slug(s):
    return unidecode(s).lower()


class ScrapeResult:
    def __init__(self, name, place, image_url, start_time, end_time, description):
        self.name = name
        self.place = place
        self.image_url = image_url
        self.start_time = start_time
        self.end_time = end_time
        self.description = description
        self.identifier = to_slug("{}-{}".format(name, str(self.start_time)))
        self.place_identifier = to_slug(place)

    def is_valid(self):
        return self.name is not None and self.place is not None and self.start_time is not None


def scrape_event(url):
    try:
        event_page = requests.get(url).text
        soup = BeautifulSoup(event_page, "html.parser")

        title = soup.find(id="h1col1").string
        image_url = soup.find(class_="img-responsive")["src"]
        details = list(soup.find(class_="det").contents)
        try:
            times = list(details[0].find_all('td')[1].strings)
            try:
                start_time = parse(times[0])
            except:
                start_time = None
            try:
                end_time = parse(times[1][2:])
            except:
                end_time = None
        except:
            start_time = None
            end_time = None

        try:
            place = details[1].find_all("td")[1].string
        except:
            place = None
        try:
            description = "\n".join(list(soup.find(class_="ww").strings))
        except:
            description = None
        return ScrapeResult(title, place, image_url, start_time, end_time, description)
    except:
        print("Failed to parse {}".format(url))
        return None


def handle_places(session, results: [ScrapeResult]):
    place_dict = {r.place_identifier: r.place for r in results}
    existing = session.query(Place).all()
    for e in existing:
        if e.identifier in place_dict:
            del place_dict[e.identifier]
    to_add = [Place(name=v, identifier=k) for k, v in place_dict.items()]
    session.add_all(to_add)
    session.flush()
    return {p.identifier: p.id for p in existing + to_add}


def handle_events(session, results: [ScrapeResult], place_dict):
    event_identifiers = session.query(Event.identifier).all()
    event_identifiers = set(e[0] for e in event_identifiers)
    for r in results:
        if r.identifier not in event_identifiers:
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
        print("FAILED TO SCRAPE")


def make_session():
    DATABASE_URL = os.environ["DATABASE_URL"]
    engine = create_engine(DATABASE_URL)
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