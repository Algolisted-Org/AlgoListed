<img src="https://i.postimg.cc/zDSKprN5/Screenshot-2022-12-31-at-7-36-53-PM.png"/>

This blog is meant to help you create a REST API that can read and write data in a local database. We've included some extra resources like websites, videos, and project ideas with source code to make learning easier. These will come in handy as you work on building your own REST API. Think of it as a guide and revision tool all rolled into one.

<b> What will you learn : </b>
  - Setting up the backend on a browser
  - Displaying information on a browser through an API 
  - Understanding the index.js file
  - Local database GET/POST methods (in a future blog)
  

<b> Prerequisites : </b> Make sure you have node installed in your system. if not watch <a href="https://www.youtube.com/watch?v=3F5IaPqj7ds" target="_blank">this video</a> and then return to the blog. 



## 1. Setup for starting backend on the browser
Let me tell you what we are going to do, we will run a URL made by our setup which will be locally hosted and you will see results on your browser. For this, you need to do this step and the next one. 

To start the localhost, you need to follow these steps:

  - So, Create a folder and make a file inside it named index.js
  - Now come to the terminal and write ‘npm init’ which creates a package.json file that contains all information about your project. It helps when you want to share your code, you can just share the package.json file rather than sharing the node_modules big folder. 
  - The above two points are well explained here : <a href="https://www.youtube.com/clip/UgkxsQR-9U8duBx8jmwFY-z21skjKv9FEXEq" target="_blank">Code with Harry video</a> 
  - Now install the two important packages required to start the server, namely express and nodemon. Write the command in the terminal ‘npm i express nodemon’.
  - Now in the package.json file find scripts and remove the test line from there and add ‘ "start": "nodemon index.js" ‘.
    <img className="small-img" src="https://i.postimg.cc/xjh8KpJY/Screenshot-2022-12-31-at-7-43-41-PM.png"/>
  - You are done with the setup, now it’s time to code. You now have to write some code on the index.js file which will be reflected on the browser. 
  
  


