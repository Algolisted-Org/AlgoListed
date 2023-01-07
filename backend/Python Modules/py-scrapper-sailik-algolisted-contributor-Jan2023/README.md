# Leetcode Questions Scraper

> Note: If you want to download daily updated problems you can visit my repo [Leetcode Questions](https://github.com/Bishalsarang/Leetcode-Questions) which basically checks leetcode daily and dowloads new problems if available. Here is the preview link for latest html https://bishalsarang.github.io/Leetcode-Questions/out.html


Leetcode Questions Scraper is a simple scrapper built on top of Selenium that fetches all the problems from leetcode and write as html and epub files.

Although leetcode doesn't provide an official API to fetch all the list of problems, we can use the API url  [https://leetcode.com/api/problems/algorithms/](https://leetcode.com/api/problems/algorithms/) used by leetcode internally to fetch problems that returns a json file containing info about problems.
The json file looks like this <br>
![enter image description here](https://qph.fs.quoracdn.net/main-qimg-4ddf7b592d1a47df4385ffc714c215b7)<br>
We can build links to each problem as 

    “https://leetcode.com/problems/" + question_title_slug
After getting the problem link we can fetch the content from the page using selenium (as Leetcode is built using react where content is rendered using JS we can't use lightweight library like requests).

You can download the sample html and epub containing 11  problems [here](https://github.com/Bishalsarang/Leetcode-Questions-Scrapper/tree/master/assets/sample%20output%20files).

## Requirements
	
I have tested it on windows machine running with Google Chrome 77.0.3865.75 and chrome driver from [here](https://chromedriver.storage.googleapis.com/index.html?path=77.0.3865.40/) and put it inside driver directory.
I haven't tested with Linux and Mac but you can download chrome driver for respective platform and make change to `CHROMEDRIVER_PATH`   inside `main.py`

Pip install all the requirements.

    requests==2.22.0
    beautifulsoup4==4.8.0
    selenium==3.141.0
    EbookLib==0.17.1
    colorama==0.4.1

    
## How to use
 - Clone the repo and install all the dependencies including latest google chrome and latest chrome driver
 - Update chrome driver path 
 - Run the following commands to download all algorithmic problems from leetcode
 `python main.py`
 ![enter image description here](https://raw.githubusercontent.com/Bishalsarang/Leetcode-Questions-Scrapper/master/assets/screenshots/main.PNG)
 This downloads problem contents to 2 files: *****out.html***** and ***chapters.pickle***.

 **NOTE:** Leetcode may temporarily block requests. If the error occurs, wait for sometime and try again or use the proxy. Don't worry, Since, the previous state is saved to ***track.conf*** file, the download resumes from where it failed.
 
 Here is how sample ***out.html*** looks like.
 ![Sample out.html](https://raw.githubusercontent.com/Bishalsarang/Leetcode-Questions-Scrapper/master/assets/screenshots/sample_out_html.PNG)
 
 After ***main.py*** script executes successfully. The pickle file is automatically converted to "***Leetcode Questions.epub***". 
 
 But you can also convert manually to epub with existing downloaded content with.
 `python epub_writer.py`
 ![enter image description here](https://raw.githubusercontent.com/Bishalsarang/Leetcode-Questions-Scrapper/master/assets/screenshots/epub_writer.PNG)
 
 Here is how sample epub file looks like
![Sample](https://raw.githubusercontent.com/Bishalsarang/Leetcode-Questions-Scrapper/master/assets/screenshots/sample_out_epub.PNG)

You can download sample files from here which contains 11 problem.
1. [Sample Out.epub](https://github.com/Bishalsarang/Leetcode-Questions-Scrapper/blob/master/assets/sample%20output%20files/out.epub)
2. [Sample Out.html](https://htmlpreview.github.io/?https://github.com/Bishalsarang/Leetcode-Questions-Scraper/blob/master/assets/sample%20output%20files/out.html)

