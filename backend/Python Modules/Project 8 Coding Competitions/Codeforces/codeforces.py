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

    # headless browser
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
                              options=options)

    driver.get(url)
    driver.maximize_window()
    return driver


def closeBrowser(driver):
    driver.close()


def getdataCodeforces(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(5)
    pageSource = browser.page_source
    WebDriverWait(browser, 5)
    soup = bs(pageSource, 'html.parser')

    upcoming_div = soup.find("div", class_="datatable")
    table = upcoming_div.find('table', class_='')
    # Extract the information for each contest
    for row in table.find_all('tr'):
        if row.find_all('td'):
            contest = {}
            cells = row.find_all('td')
            contest['contest_name'] = cells[0].text.strip()
            contest['link'] = siteUrl
            contest['time'] = cells[2].text.strip().replace('UTC+5.5', '')
            duration = cells[3].text.strip()
            duration = timedelta(hours=int(duration.split(
                ':')[0]), minutes=int(duration.split(':')[1]))
            # get the minutes
            minutes = duration.seconds // 60
            contest['duration'] = minutes
            list_of_contests.append(contest)


codeforcesLink = "https://codeforces.com/contests"
getdataCodeforces(codeforcesLink)


with open('Codeforces.json', 'w') as f:
    json.dump(list_of_contests, f)
