file = open(
    "/Users/sailikpandey/Documents/VS CODE/Web Scraping/Project 2 LUV_BABBAR/links.txt", "r")


all_links = file.readlines()

links = set()

for templink in all_links:
    link = templink.replace('\n', '')
    a, b, c, *arg = link.split('/')
    links.add(c)


print(links)
