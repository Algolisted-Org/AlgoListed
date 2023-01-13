import requests
from bs4 import BeautifulSoup
import re

count = 0

page = requests.get('https://www.interviewbit.com/courses/programming/')
soup = BeautifulSoup(page.content, 'html.parser')

file = open("all_interviewbit_questions.txt", "w", encoding="utf-8")


topics = soup.find_all(class_='topic-title')
topics_list = []
for i in range(0, len(topics)):
    topics_list.append(
        str.strip(topics[i].get_text()).lower().replace(' ', '-'))

# topics_list

for j in range(0, len(topics_list)):
    page = requests.get(
        "https://www.interviewbit.com/courses/programming/topics/"+topics_list[j])
#    page
    file.write("\n\n\n-----------------------------" +
               topics_list[j]+"----------------------------------\n\n\n")
    soup = BeautifulSoup(page.content, 'html.parser')
#    soup
    list_que = soup.find_all(class_='locked')
    que_list = []
    href_list = []
    list_href = soup.findAll('a', attrs={'href': re.compile("^/problems")})
#    len(list_que)
    for i in range(0, len(list_que)):
        que_list.append(
            str.strip(list_que[i].get_text()).replace('_', '').lower())
    for i in range(0, len(list_href)):
        if 'class="locked"' in str(list_href[i]):
            href_list.append(list_href[i].get('href'))
            count += 1

#    que_list
#    len(que_list)
#    que_list[0]
#    href_list
#    len(href_list)
#    href_list[0]

    for i in href_list:
        url = "https://www.interviewbit.com"+i
#        print(url)
        page = requests.get(url)
#        page
        soup = BeautifulSoup(page.content, 'html.parser')

        question_content = soup.find_all(
            class_='markdown-content')[0].get_text()
#        question_content

        soup = BeautifulSoup(question_content, 'html.parser')
#        soup
        question = soup.prettify(formatter=None).replace('</vector<int>', '')
        file.write(str(i+1)+". ")
        file.write(question)
        file.write('\n')
#        print(question)

print('Total number of questions scraped is '+str(count))
file.close()
#
#file = open("question.txt","r")
#content = file.read()
# content
