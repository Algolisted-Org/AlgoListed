from lib2to3.pgen2 import driver
import requests
import json
import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from time import sleep
import os

url = "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"

r = requests.get(url)
htmlContent = r.content
# print(htmlContent)

soup = bs(htmlContent, 'html.parser')
# print(soup.prettify)

anchors = soup.find_all('a', text="Link 2")
all_links = []

for link in anchors:
    if (link.get('href') != '#'):
        linkText = link.get('href', )
        # if "https://leetcode.com/" in linkText:
        all_links.append(linkText)

# elements = soup.find_all('details')
# print(elements)

list_of_questions = []

for link in all_links:
    # Scraping leetcode problems
    if "https://leetcode.com/" in link and "/login/" not in link:
        # *arg, str, d = link.split('/')
        a, b, c, d, str, *arg = link.split('/')
        if (str == "implement-strstr"):
            str = "find-the-index-of-the-first-occurrence-in-a-string"
        print(link)
        print(str)
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
            'day': '',
            'difficulty': Problemdifficulty,
            'problemTag': currTopicTag
        }

        list_of_questions.append(temp)

        # print(temp)

    # Scraping interviewbit problem
    # if "https://practice.geeksforgeeks.org/problems/" in link:
    #     browser = webdriver.Chrome(os.getcwd() + '/chromedriver')
    #     # load page
    #     browser.get(link)

    #     # execute java script
    #     browser.execute_script(
    #         "return document.getElementsByTagName('html')[0].innerHTML")

    #     # wait page to load
    #     sleep(5)

    #     # get selected content
    #     problem_description = search_box = driver.find_element(
    #         "class", "g-m-0")
    #     print(problem_description.text)
    #     print(link)

# problemsData = {"id": , "slug": "remove-consecutive-characters", "meta": {"judge_type": "code", "answer_type": "text", "is_coding_type": true, "is_checkpoint": false, "is_ninja": false, "canonical": "problems/remove-consecutive-characters", "statement": "Remove Consecutive Characters", "stage": "closed", "prenote": null, "languages": {"44": "C++17 (gcc-9.2)", "11": "C (gcc-4.8)", "27": "C# (mono 6.12)", "114": "GO (1.17.4)", "55": "Java7 (open-jdk-1.7.0)", "35": "JavaScript (ES6)", "42": "Swift (5.5)", "43": "Objective-C (clang 3.3)", "29": "PHP (php 5.5.9)", "4": "Python (python-2.7)", "116": "Python 3 (python-3.8)", "39": "Scala (scala-2.11.4)", "510": "Java 8 (array support)", "511": "Java 8 (oracle-jdk-1.8)", "512": "Ruby 2 (ruby-2.0)"}, "resource_multiplier": {"time_limit": 1, "memory_limit": 2}, "companies": ["BrowserStack"], "upvote_count": 171, "downvote_count": 87, "successful_submissions": "17289", "difficulty_level": "easy", "max_score": 200, "has_multiple_correct_choices": false, "is_text_type": true, "mcq_options": null, "input_descriptor": "There are 2 lines in the input\n\nLine 1 ( Corresponds to arg 1 ) : A single string\n\nLine 2 ( Corresponds to arg 2 ) : A single integer\n\n", "markdown_content": "**Problem Description**\u003cbr /\u003e \n \u003cdiv id=problem_description_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eGiven a string \u003cstrong\u003eA\u003c/strong\u003e and integer \u003cstrong\u003eB\u003c/strong\u003e, remove all consecutive same characters that have length exactly B.\u003cbr /\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eNOTE : \u003c/strong\u003eAll the consecutive same characters that have length exactly B will be removed simultaneously.\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Problem Constraints**\u003cbr /\u003e \n \u003cdiv id=problem_constraints_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003e1 \u0026lt;= |A| \u0026lt;= 100000\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e1 \u0026lt;= B \u0026lt;= |A|\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Input Format**\u003cbr /\u003e \n \u003cdiv id=input_format_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eFirst Argument is string A.\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eSecond argument is integer B.\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Output Format**\u003cbr /\u003e \n \u003cdiv id=output_format_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eReturn a string after doing the removals.\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Example Input**\u003cbr /\u003e \n \u003cdiv id=example_input_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eInput 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003eA = \"aabcd\"\nB = 2\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eInput 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003eA = \"aabbccd\"\nB = 2\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Example Output**\u003cbr /\u003e \n \u003cdiv id=example_output_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eOutput 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \"bcd\"\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eOutput 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \"d\"\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e**Example Explanation**\u003cbr /\u003e \n \u003cdiv id=example_explanation_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eExplanation 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \"aa\" had length 2.\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eExplanation 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \"aa\", \"bb\" and \"cc\" had length of 2.\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e", "checkpoint_problem_count": 2, "discourse_category": {"solved_name": "Remove Consecutive Characters : Solved", "unsolved_name": "Remove Consecutive Characters : Unsolved", "solved_id": 1946, "unsolved_id": 1945, "solved_slug": "interviewbit-problems/remove-consecutive-characters-solved", "unsolved_slug": "interviewbit-problems/remove-consecutive-characters-unsolved"}, "total_submissions": 38975}, "article": {
#     "content": "\u003cp\u003e\u003cstrong\u003eProblem Description\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=problem_description_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eGiven a string \u003cstrong\u003eA\u003c/strong\u003e and integer \u003cstrong\u003eB\u003c/strong\u003e, remove all consecutive same characters that have length exactly B.\u003cbr /\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eNOTE : \u003c/strong\u003eAll the consecutive same characters that have length exactly B will be removed simultaneously.\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eProblem Constraints\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=problem_constraints_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003e1 \u0026lt;= |A| \u0026lt;= 100000\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e1 \u0026lt;= B \u0026lt;= |A|\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eInput Format\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=input_format_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eFirst Argument is string A.\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eSecond argument is integer B.\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eOutput Format\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=output_format_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eReturn a string after doing the removals.\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eExample Input\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=example_input_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eInput 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003eA = \u0026quot;aabcd\u0026quot;\nB = 2\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eInput 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003eA = \u0026quot;aabbccd\u0026quot;\nB = 2\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eExample Output\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=example_output_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eOutput 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \u0026quot;bcd\u0026quot;\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eOutput 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \u0026quot;d\u0026quot;\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003cstrong\u003eExample Explanation\u003c/strong\u003e\u003cbr /\u003e \n \u003cdiv id=example_explanation_markdown_content_value style=\"background-color: #f9f9f9; padding: 5px 10px; \"\u003e\u003cp\u003eExplanation 1:\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \u0026quot;aa\u0026quot; had length 2.\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003eExplanation 2:\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\n\u003cpre\u003e \u0026quot;aa\u0026quot;, \u0026quot;bb\u0026quot; and \u0026quot;cc\u0026quot; had length of 2.\n\u003c/pre\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\n\u003cp\u003e\u003c/p\u003e\u003c/div\u003e\u003cbr /\u003e\u003cbr /\u003e\u003c/p\u003e\n", "video": null, "title": null, "type": "default", "text": "Problem Description Given a string A and integer B, remove all consecutive same characters that have length exactly B. NOTE : All the consecutive same characters that have length exactly B will be removed simultaneously. Problem Constraints 1 \u003c= |A| \u003c= 100000 1 \u003c= B \u003c= |A| Input Format First Argument is string A. Second argument is integer B. Output Format Return a string after doing the removals. Example Input Input 1: A = \"aabcd\" B = 2 Input 2: A = \"aabbccd\" B = 2 Example Output Output 1: \"bcd\" Output 2: \"d\" Example Explanation Explanation 1: \"aa\" had length 2. Explanation 2: \"aa\", \"bb\" and \"cc\" had length of 2."}, "course": {"slug": "programming", "title": "Programming"}, "topic": {"slug": "strings", "level": null}, "hints": {"hints": [{"id": 9412, "title": "Hint 1", "score_reduction": 10}, {"id": 9413, "title": "Solution Approach", "score_reduction": 50}, {"id": 9414, "title": "Complete Solution", "score_reduction": 100}], "complete_solution": {"id": 9414, "title": "Complete Solution", "score_reduction": 100}}, "breadcrumb": {"course": {"id": "programming", "title": "Programming", "url": "/courses/programming"}, "topic": {"id": "strings", "title": "Strings", "level": 3, "url": "/courses/programming/topics/strings"}}, "is_bookmarked": false, "votes": {"has_upvoted": false, "has_downvoted": false}, "accessed_hints": [], "time_spent": {"total_seconds": 2454, "seconds": 54, "minutes": 40, "hours": 0, "current_time": "2023-01-03T03:52:56.038Z"}, "similar_problems": [{"slug": "amazing-subarrays", "problem_statement": "Amazing Subarrays", "difficulty_level": "easy", "average_solving_time": 1599, "tags": ["String Search"]}, {"slug": "palindrome-string", "problem_statement": "Palindrome String", "difficulty_level": "easy", "average_solving_time": 1840, "tags": ["string Simulation"]}, {"slug": "minimum-characters-required-to-make-a-string-palindromic", "problem_statement": "Minimum Characters required to make a String Palindromic", "difficulty_level": "medium", "average_solving_time": 3881, "tags": ["string Tricks", "Amazon", "Microsoft"]}], "score_decay": {"minutes_to_plateau": 180, "bottom_score_factor": 0.3, "attempt_reduction_factor": 0.9, "max_time_attempt_decay": 0.25}, "score": {"max_score": 200, "current_available_score": 169, "obtained_score": 0}, "average_solving_time": null, "checkpoint": {"is_checkpoint": false, "has_passed_checkpoint": null}, "user_submissions": {"has_submission": false, "language_id": null, "has_solved": false, "time_to_solve": null, "submission_count": 0, "submission_stage_data": null}, "saved_code": {"content": "string Solution::solve(string A, int B) {\n}\n", "language_id": 44, "resource_multiplier": {"time_limit": 1, "memory_limit": 2}, "memory_limit": 80000000, "time_limit": 5.0, "type": "solution"}}

    print('-'*8)
    time.sleep(1)


with open('data.json', 'w') as f:
    json.dump(list_of_questions, f)
