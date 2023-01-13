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
from time import sleep
import os

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


def getdataAtcoder(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(2)
    pageSource = browser.page_source
    WebDriverWait(browser, 5)
    soup = bs(pageSource, 'html.parser')
    upcoming_contests_div = soup.find_all(
        "div", {"id": "contest-table-upcoming"})
    for ok1 in upcoming_contests_div:
        tempDiv1 = ok1.find_all("div", {"class": "panel panel-default"})
        for ok2 in tempDiv1:
            tempDiv2 = ok2.find_all("div", {"class": "table-responsive"})
            for ok3 in tempDiv2:
                tempDiv3 = ok3.find_all("table", {
                                        "class": "table table-default table-striped table-hover table-condensed table-bordered small"})
                for ok4 in tempDiv3:
                    tempDiv4 = ok4.find_all('tbody')
                    for ok5 in tempDiv4:
                        tempDiv5 = ok5.find_all('tr')
                        # for ok6 in tempDiv5:
                        for ok7 in tempDiv5:
                            time_element = ok7.find(
                                "time", class_="fixtime-full")
                            if time_element:
                                time1 = time_element.text
                            else:
                                time1 = None

                            # find the link
                            contest_element = ok7.find(
                                "a", href=lambda x: x and x.startswith("/contests"))
                            if contest_element:
                                contest_link = contest_element["href"]
                            else:
                                contest_link = None

                            # find the contest name
                            contest_element = ok7.find(
                                "a", href=lambda x: x and x.startswith("/contests"))
                            if contest_element:
                                contest_name = contest_element.text
                            else:
                                contest_name = None

                            temp = {
                                "contest_name": contest_name,
                                "link": "https://atcoder.jp"+contest_link,
                                "time": time1
                            }

                            list_of_contests.append(temp)
                            print(temp)


atCoderLink = "https://atcoder.jp/contests/"
getdataAtcoder(atCoderLink)


with open('Contests.json', 'w') as f:
    json.dump(list_of_contests, f)
