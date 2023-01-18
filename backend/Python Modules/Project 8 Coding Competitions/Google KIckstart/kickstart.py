from lib2to3.pgen2 import driver
from openpyxl import Workbook
import pandas as pd
import requests
import json
import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import timedelta


list_of_contests = []


def openBrowser(url):
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    options.add_argument('--incognito')
    options.add_argument('--headless')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
                              options=options)

    driver.get(url)
    return driver


def closeBrowser(driver):
    driver.close()


def getDataKickstart(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(5)
    pageSource = browser.page_source
    WebDriverWait(browser, 5)
    soup = bs(pageSource, 'html.parser')

    schedule = soup.find_all('div', class_="schedule")
    schedule = schedule[2]

    for row in schedule.find_all('div', class_='schedule-row schedule-row__upcoming'):
        contest_name = row.find(
            'span', text=lambda x: x and x.startswith('Round')).text
        start_time = row.find_all(
            class_='schedule-row-cell')[1].text.replace(' (UTC)', '')
        duration = row.find_all('span')[-1].text

        temp = {
            "contest_name": contest_name,
            "link": "https://codingcompetitions.withgoogle.com/kickstart/schedule",
            "time": start_time.replace('\u00a0', ''),
            "duration": duration
        }

        list_of_contests.append(temp)
        print(temp)


kickstartLink = "https://codingcompetitions.withgoogle.com/kickstart/schedule"
getDataKickstart(kickstartLink)

with open('kickstart.json', 'w') as f:
    json.dump(list_of_contests, f)
