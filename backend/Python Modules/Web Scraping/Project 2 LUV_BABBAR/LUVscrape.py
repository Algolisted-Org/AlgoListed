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

list_of_questions = []
count = 0


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


def getDataLeetcode(link):
    a, b, c, d, str, *arg = link.split('/')
    leetCodeData = {"operationName": "questionData", "variables": {"titleSlug": str}, "query": "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    enableTestMode\n    envInfo\n    libraryUrl\n    __typename\n  }\n}\n"}

    req = requests.post('https://leetcode.com/graphql/',
                        json=leetCodeData).json()
    leetCodeTitle = req['data']['question']['title']
    Problemdifficulty = req['data']['question']['difficulty']
    Topictag = req['data']['question']['topicTags']

    # print(leetCodeTitle)
    # print(link)
    # print(Problemdifficulty)
    currTopicTag = []

    for name in Topictag:
        # print(name["name"])
        currTopicTag.append(name["name"])

    temp = {
        'title': leetCodeTitle,
        'problemlink': link,
        'difficulty': Problemdifficulty,
        'problemTag': currTopicTag
    }
    print(temp)

    list_of_questions.append(temp)


def getDataGFGProblem(siteUrl):

    try:
        browser = openBrowser(siteUrl)
        time.sleep(2)
        pageSource = browser.page_source
        WebDriverWait(browser, 2)
        soup = bs(pageSource, 'html.parser')

        currTopicTag = []
        currComTag = []

        # Fetching total number of pages
        questionTitle = soup.find(
            'div', class_="problems_header_content__title__L2cB2 g-mb-0").find('h3')
        # print(questionTitle.text)
        # print(siteUrl)
        questionDifficulty = soup.find(
            'div', class_="problems_header_description__t_8PB").find_all('span')[0]
        # print(questionDifficulty.text)
        tempDiv = soup.find(
            'div', class_="accordion ui problems_accordion_tags_container__zk2Um")

        tempCheck = soup.find('div', class_="problems_tag_container__kWANg")
        if (tempCheck.text == "Company Tags"):
            currProblemTag = soup.find(
                'div', class_="accordion ui problems_accordion_tags_container__zk2Um").find_all('div', class_="ui labels")[1].find_all('a')

            for probTag in currProblemTag:
                # print(probTag.text)
                currTopicTag.append(probTag.text)

            currCompanyTag = soup.find(
                'div', class_="accordion ui problems_accordion_tags_container__zk2Um").find_all('div', class_="ui labels")[0].find_all('a')

            for probCom in currCompanyTag:
                # print(probCom.text)
                currComTag.append(probCom.text)

            # if (len(tempDiv) > 2):

        else:
            currProblemTag = soup.find(
                'div', class_="accordion ui problems_accordion_tags_container__zk2Um").find_all('div', class_="ui labels")[0].find_all('a')

            for probTag in currProblemTag:
                # print(probTag.text)
                currTopicTag.append(probTag.text)

        temp = {
            'title': questionTitle.text,
            'problemlink': siteUrl,
            'difficulty': questionDifficulty.text,
            'problemTag': currTopicTag,
            'companyTag': currComTag
        }

        print(temp)

        list_of_questions.append(temp)

    except Exception as e:
        print("Some error occured, error: ", e)
        return


def getDataGFG(siteUrl):
    try:
        browser = openBrowser(siteUrl)
        time.sleep(2)
        pageSource = browser.page_source
        WebDriverWait(browser, 5)
        soup = bs(pageSource, 'html.parser')

        # print(soup)
        if (soup.find_all('div', id="practiceLinkDiv")):
            special_divs = []
            if (soup.find_all('div', id="try-it")):
                special_divs = soup.find_all('div', id="try-it")

            # we have to fix this if condition
            if (soup.find_all('div', id="practiceLinkDiv") and len(special_divs) == 0 and "https://ide.geeksforgeeks.org/" not in soup.find('div', class_='practiceBannerFromcontent').find('a')[
                    'href']):
                link = soup.find('div', class_='practiceBannerFromcontent').find('a')[
                    'href']
                getDataGFGProblem(link)

            elif (len(special_divs) == 0):
                title = ""
                tempTitle = soup.find_all('div', class_="article-title")
                for ok in tempTitle:
                    title = (ok.text)

                articleDifficulty = soup.find_all(
                    'div', class_="vote-s")[0]

                difficulty = ""
                for ok in articleDifficulty:
                    difficulty = (ok.text)

                problemTag = []
                probTag = soup.find_all('div', class_="improved")
                for ok in probTag[2]:
                    if (ok.text != "Practice Tags :"):
                        for text in ok:
                            # print(text.text)
                            problemTag.append(text.text)

                temp = {
                    'title': title,
                    'problemlink': siteUrl,
                    'difficulty': difficulty,
                    'problemTag': problemTag,
                }
                print(temp)
                list_of_questions.append(temp)

            else:
                for text in special_divs:
                    download = text.find_all('a')
                    for text in download:
                        hrefText = (text['href'])
                        getDataGFGProblem(hrefText)

        else:
            title = ""
            tempTitle = soup.find_all('div', class_="article-title")
            for ok in tempTitle:
                title = (ok.text)

            articleDifficulty = soup.find_all(
                'div', class_="vote-s")[0]

            difficulty = ""
            for ok in articleDifficulty:
                difficulty = (ok.text)

            problemTag = []
            probTag = soup.find_all('div', class_="improved")
            for ok in probTag[2]:
                if (ok.text != "Practice Tags :"):
                    for text in ok:
                        # print(text.text)
                        problemTag.append(text.text)

            temp = {
                'title': title,
                'problemlink': siteUrl,
                'difficulty': difficulty,
                'problemTag': problemTag,
            }
            print(temp)
            list_of_questions.append(temp)

    except Exception as e:
        print("Some error occured, error: ", e)
        return


def getDataHakerearth(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(2)
    pageSource = browser.page_source
    WebDriverWait(browser, 2)
    soup = bs(pageSource, 'html.parser')

    title = soup.find('div', class_="title")
    # print(title.text)

    problemDes = soup.find(
        'div', class_="problem-meta").find_all('div', class_="item")
    probTag = (problemDes[4].text.split(','))
    problemTag = []
    difficulty = ""
    for ok in probTag:
        text = ok.strip()
        if (text == "Easy" or text == "Medium" or text == "Hard"):
            difficulty = text
        else:
            problemTag.append(text)

    # print(problemTag)
    temp = {
        'title': title.text,
        'problemlink': siteUrl,
        'difficulty': difficulty,
        'problemTag': problemTag
    }
    print(temp)

    list_of_questions.append(temp)


def getDataSpoj(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(2)
    pageSource = browser.page_source
    WebDriverWait(browser, 2)
    soup = bs(pageSource, 'html.parser')

    title = soup.find('h2', id="problem-name")
    # print(title.text)

    probTag = soup.find('div', id="problem-tags")
    problemTags = []
    if (probTag.text.strip() != "no tags"):
        text = probTag.text.strip()
        text = text.replace('#', '')
        if ('\n' in text):
            text = text.replace('\n', ',')
            problemTags = text.split(',')
        else:
            problemTags.append(text)

    # print(problemTags)

    temp = {
        'title': title.text,
        'problemlink': siteUrl,
        'problemTag': problemTags
    }
    print(temp)

    list_of_questions.append(temp)


def getDataTechiedelight(siteUrl):
    browser = openBrowser(siteUrl)
    time.sleep(2)
    pageSource = browser.page_source
    WebDriverWait(browser, 2)
    soup = bs(pageSource, 'html.parser')

    title = soup.find('h1', class_="entry-title")
    # print(title.text)

    temp = {
        'title': title.text,
        'problemlink': siteUrl,
    }
    print(temp)

    list_of_questions.append(temp)


def getDataHackerrank(siteUrl):
    # # Access Denied
    # U must log in to gain access

    # browser = openBrowser(siteUrl)
    # time.sleep(2)
    # pageSource = browser.page_source
    # WebDriverWait(browser, 2)
    # soup = bs(pageSource, 'html.parser')

    # title = soup.find('h1')
    # print(title.text)

    # difficulty = soup.find('p', class_='difficulty-label')
    # print(difficulty.text)

    temp = {
        'title': "Journey to the Moon",
        'difficulty': "Medium",
        'problemlink': siteUrl,
    }
    print(temp)

    list_of_questions.append(temp)


file = open(
    "/Users/sailikpandey/Documents/VS CODE/Web Scraping/Project 2 LUV_BABBAR/links.txt", "r")


all_links = file.readlines()

print('-'*8)

for templink in all_links:
    link = templink.replace('\n', '')

    if "https://leetcode.com/" in link:
        print(link)
        getDataLeetcode(link)
        count += 1
        print('-'*8)

    elif "https://practice.geeksforgeeks.org/" in link:
        print(link)
        getDataGFGProblem(link)
        count += 1
        print('-'*8)

    elif "https://www.geeksforgeeks.org/" in link:
        print(link)
        getDataGFG(link)
        count += 1
        print('-'*8)

    elif "https://www.hackerearth.com/" in link:
        print(link)
        getDataHakerearth(link)
        count += 1
        print('-'*8)

    elif "https://www.spoj.com/" in link:
        print(link)
        getDataSpoj(link)
        count += 1
        print('-'*8)

    elif "https://www.techiedelight.com/" in link:
        print(link)
        getDataTechiedelight(link)
        count += 1
        print('-'*8)

    elif "https://www.hackerrank.com/" in link:
        print(link)
        getDataHackerrank(link)
        count += 1
        print('-'*8)


with open('Luv_Babbar.json', 'w') as f:
    json.dump(list_of_questions, f)
