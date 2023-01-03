<img src="https://i.postimg.cc/zDSKprN5/Screenshot-2022-12-31-at-7-36-53-PM.png"/>

This blog is meant to help you create a REST API that can read and write data in a local database. We've included some extra resources like websites, videos, and project ideas with source code to make learning easier. These will come in handy as you work on building your own REST API. Think of it as a guide and revision tool all rolled into one.

<b> What will you learn : </b>
  - Setting up the backend on a browser
  - Displaying information on a browser through an API 
  - Understanding the index.js file
  - Local database GET methods 
  - Local database POST methods using Thunder Client (Next Blog)
  

<b> Prerequisites : </b> Make sure you have node installed in your system. if not watch <a href="https://www.youtube.com/watch?v=3F5IaPqj7ds" target="_blank">this video</a> and then return to the blog. 



## 1. Setup for starting backend on the browser
Let me tell you what we are going to do, we will run a URL made by our setup which will be locally hosted and you will see results on your browser. For this, you need to do this step and the next one. 

To start the localhost, you need to follow these steps:
<>
  - So, Create a folder and make a file inside it named index.js
  - Now come to the terminal and write ‘npm init’ which creates a package.json file that contains all information about your project. It helps when you want to share your code, you can just share the package.json file rather than sharing the node_modules big folder. 
  - The above two points are well explained here : <a href="https://www.youtube.com/clip/UgkxsQR-9U8duBx8jmwFY-z21skjKv9FEXEq" target="_blank">Code with Harry video</a> 
  - Now install the two important packages required to start the server, namely express and nodemon. Write the command in the terminal ‘npm i express nodemon’.
  - Now in the package.json file find scripts and remove the test line from there and add ‘ "start": "nodemon index.js" ‘.
    <img className="small-img" src="https://i.postimg.cc/xjh8KpJY/Screenshot-2022-12-31-at-7-43-41-PM.png"/>
  - You are done with the setup, now it’s time to code. You now have to write some code on the index.js file which will be reflected on the browser. 
</>
  


## 2. Showing information on the browser through API
The code for what we have done and what we are going to do is already available at - https://github.com/Nayaker/Node-JS---Codes/tree/node-setup.
Now you have the whole setup and you just need to code on the index.js file to reflect your API responses on the browser. 

Paste this code on your index.js file. 

```
const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
   res.send('Hello World, our first API is running');
});
 
const port = 8000;
 
app.listen(port, () => console.log(`Listening on localhost:${port} ...`));
```

This is the entry point for your APIs, the backend will be started from here. Write `nodemon index.js` on the terminal. Now go to http://localhost:8000/ on your browser. It should show ‘Hello World, our first API is running’.

<img className="small-img" src="https://i.postimg.cc/fTkqX7qQ/Screenshot-2022-12-31-at-9-02-17-PM.png"/>


## 3. Understanding the index.js file
In reference to the above code. 

The main this is we write the code on the middle part which is app.get or app.post functions to handle the data transfer. 
The top line calls express, which makes us able to use the routes easily, express a layer built on the top of the Node js that helps manage servers and routes. 

const `app = express();` Calls the express function "express()" and puts a new Express application inside the app variable (to start a new Express 
application). It's something like you are creating an object of a class to use its properties. 

The `app.listen()` function is used to bind and listen to the connections on the specified host and port.


## 4. Local database GET methods 
GET and POST are the two most commonly HTTP methods used in web development to retrieve or send data to a server. In this section, we'll learn how to use these methods in your own projects. Let's get started!

There are mainly two types of Get requests
- Sending static information
- Information based on custum API route
- Using local Array database


#### Sending static information
The code which we whote above was also using a get request. Evenever we call the API a hello world message would be shown. 
```
app.get('/', (req, res) => {
   res.send('Hello World, our first API is running');
});
```

We can change the route and play around to give specific values at specific routes. For example `We are in name route` will be visible on http://localhost:8000/name
```
app.get('/name', (req, res) => {
   res.send('We are in name route');
});
```

#### Information based on custum API route
An example for custum API route can be `https://www.instagram.com/zuck` - I know this is a URL and not an API but it is a good example :) 

<img width="982" alt="Screenshot 2023-01-04 at 1 01 08 AM" src="https://user-images.githubusercontent.com/93304796/210427927-7e73243c-d855-441f-a322-5dae382211fe.png">

Here zuck is the username with respect to which a perticular profile on page will be show, if you change the username to your handle you will see your profile. 

Now, if we go deep into thinking how are they showing the data on screen - they are calling an API based on the username which is also custom. We can think like they are calling `no-instagram-api/zuck` which is bringing data for zuck username.  The actaul API looks like `no-instagram-api/:username`. 

`:username` is known as <b>param</b>, meaning parameters - which is the variable part of an API. 

```
app.get('/hello/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello ${username}, nice to meet you.`);
});
```

<img className="small-img" width="326" alt="Screenshot 2023-01-04 at 1 11 40 AM" src="https://user-images.githubusercontent.com/93304796/210429455-91ffe8cc-3443-4a82-8f28-82106bc5862f.png">










  


