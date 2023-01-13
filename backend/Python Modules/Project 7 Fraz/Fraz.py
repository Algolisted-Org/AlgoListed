from bs4 import BeautifulSoup
import requests
import json


list_of_questions = []


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


file = open(
    "/Users/sailikpandey/Documents/VS CODE/Web Scraping/Project 7 Fraz/links.txt", "r")


all_links = file.readlines()

print('-'*8)

for templink in all_links:
    link = templink.replace('\n', '')
    print(link)
    getDataLeetcode(link)

with open('Fraz.json', 'w') as f:
    json.dump(list_of_questions, f)
