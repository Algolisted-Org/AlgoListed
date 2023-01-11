from bs4 import BeautifulSoup
import requests
import json


list_of_questions = []

HTMLFileToBeOpened = open(
    "/Users/sailikpandey/Documents/VS CODE/Web Scraping/Neetcode Blind 75/Neetcode.html", "r")


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


contents = HTMLFileToBeOpened.read()

soup = BeautifulSoup(contents, 'html.parser')

links = soup.find_all('a', class_="table-text")
for ok in links:
    linkText = (ok['href'])
    getDataLeetcode(linkText)

with open('NeetcodeBlind75.json', 'w') as f:
    json.dump(list_of_questions, f)
