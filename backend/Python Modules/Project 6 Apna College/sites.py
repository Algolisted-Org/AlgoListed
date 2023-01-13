file = open(
    "/Users/sailikpandey/Documents/VS CODE/Web Scraping/Project 6 Apna College/links.txt", "r")


all_links = file.readlines()

links = set()

for templink in all_links:
    link = templink.replace('\n', '')
    a, b, c, *arg = link.split('/')
    links.add(c)


print(links)

{'www.interviewbit.com', 'www.hackerrank.com', 'cp-algorithms.com', 'leetcode.com', 'www.spoj.com',
    'practice.geeksforgeeks.org', 'www.geeksforgeeks.org', 'www.hackerearth.com', 'geeksforgeeks.org'}
