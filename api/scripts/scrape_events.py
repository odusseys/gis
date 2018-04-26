import requests, asyncio, concurrent
from bs4 import BeautifulSoup


URL = "https://gaypers.com"

page = requests.get(URL + "/Paris").text

soup = BeautifulSoup(page, "html.parser")

cards = soup.find_all(class_="col-lg-3 col-md-4 col-sm-6 col-xs-6")
links = ["{}{}".format(URL, c.a["href"]) for c in cards]

def scrape_event(url):
    event_page = requests.get(url).text
    soup = BeautifulSoup(event_page, "html.parser")

    title = soup.find(id="h1col1").string
    image_url = soup.find(class_="img-responsive")["src"]
    details = list(soup.find(class_="det").contents)
    try:
        times = list(details[0].find_all('td')[1].strings)
        start_time = times[0]
        end_time = times[1][2:]
    except:
        start_time=None
        end_time=None
    try:
        place = details[1].find_all("td")[1].string
    except:
        place = None
    print("scraped {}".format(title))
    return dict(title=title, place=place, image_url=image_url, start_time=start_time, end_time=end_time)


async def main():

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
        print(res)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())


