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


def googleSchedule(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(4)
    pageSource = browser.page_source
    WebDriverWait(browser, 4)
    soup = bs(pageSource, 'html.parser')

    table = soup.find_all('span')
    print(table)


def codeforcesSchedule(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(4)
    pageSource = browser.page_source
    WebDriverWait(browser, 4)
    soup = bs(pageSource, 'html.parser')

    # upcoming_contest_ids = [a['href'].split(
    #     '/')[-1] for a in soup.select('div.datatable a[href^="/contest/"]')]

    # # print(upcoming_contest_ids)

    # # print(upcoming_contest_ids)
    # idArray = []
    # for ok in upcoming_contest_ids:
    #     if (ok != "virtual" and ok != "standings"):
    #         idArray.append(ok)

    # print(idArray)

    upcoming_contests = soup.find_all("div", class_="datatable")[1]
    for row in upcoming_contests.find_all("tr"):
        cells = row.find_all("td")
        if len(cells) > 0:
            contest_name = cells[0].text
            start_time = cells[1].text
            duration = cells[2].text
            print(
                f"Name: {contest_name}, Start Time: {start_time}, Duration: {duration}")


googleLink = "https://codingcompetitions.withgoogle.com/kickstart/schedule"
# googleSchedule(googleLink)

codeforcesLink = "https://codeforces.com/contests"
codeforcesSchedule(codeforcesLink)


['1775', '1783', '1768', '1779', '1770', '1731', '1763', '1772', '1774',
 '1767', '1762', '1766', '1771', '1773', '1765', '1764', '1758', '1760',
 '1761', '1759', '1751', '1752', '1748', '1755', '1750', '1747', '1740',
 '1732', '1753', '1754', '1749', '1743', '1744', '1746', '1742', '1741',
    '1736', '1737', '1735', '1738', '1739', '1730', '1734', '1733', '1723',
 '1724', '1729', '1728', '1726', '1725', '1717', '1722', '1721', '1715',
 '1720', '1718', '1719', '1712', '1713', '1716', '1714', '1704', '1710',
 '1711', '1709', '1706', '1707', '1708', '1705', '1703', '1702', '1701',
 '1699', '1698', '1696', '1700', '1695', '1693', '1694', '1692', '1697',
         '1689', '1690', '1687', '1688', '1691', '1685', '1686', '1681', '1682',
 '1684', '1679', '1680', '1676', '1677', '1678', '1670', '1675', '1674', '1673']
