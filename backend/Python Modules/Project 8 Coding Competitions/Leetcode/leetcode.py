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

    # driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    # headless browser
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
                              options=options)

    driver.get(url)
    driver.maximize_window()
    return driver


def closeBrowser(driver):
    driver.close()


def getDataLeetcode(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(5)
    pageSource = browser.page_source
    WebDriverWait(browser, 5)
    soup = bs(pageSource, 'html.parser')
    upcoming_contests = soup.find('div', class_='swiper-wrapper')
    upcoming_contests = upcoming_contests.find_all(
        'div', class_='swiper-slide')
    # Iterate through the elements and extract the desired information
    for contest in upcoming_contests:
        contest_name = contest.find('div', class_='truncate').text
        contest_link = "https://leetcode.com" + contest.find('a')['href']
        start_time = contest.find('div', class_='text-label-2').text
        duration_in_minutes = 90
        temp = {
            "contest_name": contest_name,
            "link": contest_link,
            "time": start_time,
            "duration": duration_in_minutes
        }

        list_of_contests.append(temp)
        print(temp)


leetcodeLink = "https://leetcode.com/contest/"
getDataLeetcode(leetcodeLink)


with open('Leetcode.json', 'w') as f:
    json.dump(list_of_contests, f)
