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


def getAajtakData(siteUrl):
    try:
        browser = openBrowser(siteUrl)
        time.sleep(2)
        pageSource = browser.page_source
        WebDriverWait(browser, 10)
        soup = bs(pageSource, 'html.parser')

        file = open('aajtak.txt', 'w')
        # Scraping the link
        link = soup.find('div', class_='field field--name-field-media-image field--type-image field--label-hidden field__item').find('img')[
            'src']
        print(link)
        file.write(link+'\n\n')

        # Scraping the Title
        title = soup.find('h1')
        print(title.text)
        file.write(title.text+'\n\n')

        # Scraping the h2 elements
        h2Element = soup.find('h2', id="copy_true")
        print(h2Element.text)
        file.write(h2Element.text+'\n\n')

        contents = soup.find_all('p')
        for text in contents:
            file.write(text.text + '\n')
        file.close()

    except Exception as e:
        print("Some error occured, error: ", e)
        return


link = "https://www.aajtak.in/fact-check/story/rishabh-pant-accident-ms-dhoni-hospital-fact-check-ntc-1610079-2023-01-06"
getAajtakData(link)
