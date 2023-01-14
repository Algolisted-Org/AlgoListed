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

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    # headless browser
    # driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
    #                           options=options)

    driver.get(url)
    driver.maximize_window()
    return driver


def closeBrowser(driver):
    driver.close()


def getdataCodeshef(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(5)
    pageSource = browser.page_source
    WebDriverWait(browser, 5)
    soup = bs(pageSource, 'html.parser')
    table = soup.find('div', class_="_contest-tables__container_bfigg_203")
    upcomingDiv = table.select(
        '._table__container_bfigg_309:nth-child(2)')[0]
    table = upcomingDiv.find('table', class_='_mui-table__container_bfigg_352')

    # Find all rows in the table
    rows = table.find_all('tr')
    count = 0
    # print(len(rows))
    for row in rows:
        if (count > 0):
            contest_name = row.find("span").text

            # Extract the contest link
            contest_link = row.find("a")["href"]

            # Extract the contest start date
            start_date = row.find(
                "div", {"class": "_start-date__container_bfigg_366"}).find("p").text

            start_time = row.find("div", {"class": "_start-date__container_bfigg_366"}
                                  ).find("p", {"class": "_grey__text_bfigg_371"}).text

            # Extract the contest duration
            # Extract the contest duration in minutes
            duration_days = row.find("div", {"class": "_duration__container_bfigg_374"}).find(
                "p", text=lambda x: x and x.strip().endswith("Days"))
            duration_hours = row.find("div", {"class": "_duration__container_bfigg_374"}).find(
                "p", text=lambda x: x and x.strip().endswith("Hrs"))
            duration_minutes = row.find("div", {"class": "_duration__container_bfigg_374"}).find(
                "p", text=lambda x: x and x.strip().endswith("Min"))
            days, hours, minutes = 0, 0, 0
            if duration_days:
                days = int(duration_days.text.split()[0])
            if duration_hours:
                hours = int(duration_hours.text.split()[0])
            if duration_minutes:
                minutes = int(duration_minutes.text.split()[0])
            duration_in_minutes = (days*24*60) + (hours*60) + minutes

            # print("Contest Name: ", contest_name)
            # print("Contest Link: ", contest_link)
            # print("Contest Start Date: ", start_date)
            # print("Contest Start Time: ", start_time)
            # print("Contest Duration: ", duration_in_minutes)

            temp = {
                "contest_name": contest_name,
                "link": contest_link,
                "time": start_date+' '+start_time,
                "duration": duration_in_minutes
            }

            list_of_contests.append(temp)
            print(temp)
        count += 1


codesheflink = "https://www.codechef.com/contests?itm_medium=navmenu&itm_campaign=allcontests"
getdataCodeshef(codesheflink)


with open('Codeshef.json', 'w') as f:
    json.dump(list_of_contests, f)
