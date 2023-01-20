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

    if "https://www.codechef.com/" in url:
        driver = webdriver.Chrome(service=Service(
            ChromeDriverManager().install()))
    else:
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

                            # contest duration
                            duration_elements = ok7.find_all(
                                "td", class_="text-center")
                            if duration_elements:
                                # Get the second td element
                                duration = duration_elements[1].text
                                duration = timedelta(hours=int(duration.split(
                                    ':')[0]), minutes=int(duration.split(':')[1]))
                                # get the minutes
                                minutes = duration.seconds // 60
                            else:
                                duration = None
                            temp = {
                                "contest_name": contest_name,
                                "link": "https://atcoder.jp"+contest_link,
                                "time": time1,
                                "duration": minutes
                            }

                            list_of_contests.append(temp)
                            print(temp)


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
        
        

leetcodeLink = "https://leetcode.com/contest/"
getDataLeetcode(leetcodeLink)

codeforcesLink = "https://codeforces.com/contests"
getdataCodeforces(codeforcesLink)

codesheflink = "https://www.codechef.com/contests?itm_medium=navmenu&itm_campaign=allcontests"
getdataCodeshef(codesheflink)

atCoderLink = "https://atcoder.jp/contests/"
getdataAtcoder(atCoderLink)

kickstartLink = "https://codingcompetitions.withgoogle.com/kickstart/schedule"
getDataKickstart(kickstartLink)

with open('allContests.json', 'w') as f:
    json.dump(list_of_contests, f)
