from selenium import webdriver

url = 'https://www.codechef.com/contests'

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--headless')
options.add_argument('start-maximized')
options.add_argument('disable-infobars')
options.add_argument('--disable-gpu')
options.add_argument('--remote-debugging-port=9222')

driver = webdriver.Chrome(chrome_options=options)
driver.get(url)
table_data = driver.find_elements_by_xpath('//table[@class="dataTable"]')
print(table_data)
