<!-- 
  "date" : "January 2, 2023",
  "title" : "Backend with Node JS for beginners",
  "desc" : "This blog is meant to help you create a REST API that can read and write data in a local database. We've included some extra resources like websites, videos, and project ideas with source code to make learning easier. These will come in handy as you work on building your own REST API. Think of it as a guide and revision tool all rolled into one.",
  "category" : "Web Development",
  "author" : ["Atanu Nayak"],
  "authorLink" : ["https://www.linkedin.com/in/atanu-nayak-profile/"],
  "authorImageLink" : ["https://avatars.githubusercontent.com/u/93304796?v=4"],
  "tags" : ["Backend", "Node Js", "Express", "MongoDB"],
  "url" : "backend-with-node-js-for-beginners",
  "titleSupport" : "Learn to start your backend with node.js"
 -->


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
There are two main types of HTTP methods that are commonly used in web development: GET and POST. In this section, we will learn how to use GET methods in our own projects. 

There are mainly two types of Get requests
- Sending static information
- Information based on custum API route
- Using local Array database


#### Sending static information
The code we wrote previously made use of a GET request. Whenever the API is called, the message "Hello World, our first API is running" will be displayed. 

```
app.get('/', (req, res) => {
   res.send('Hello World, our first API is running');
});
```

We can modify the route and test out different values at different routes. For example, if we visit the route http://localhost:8000/name, we will see the message `We are in name route`. This is achieved by adding the following code:

```
app.get('/name', (req, res) => {
   res.send('We are in name route');
});
```

#### Information based on custum API route
An example of a custom URL route is https://www.instagram.com/zuck, which displays the profile of the user with the username "zuck". If we change the username to our own handle, our own profile will be displayed.

<img width="982" alt="Screenshot 2023-01-04 at 1 01 08 AM" src="https://user-images.githubusercontent.com/93304796/210427927-7e73243c-d855-441f-a322-5dae382211fe.png">

Here zuck is the username with respect to which a perticular profile on page will be show, if you change the username to your handle you will see your profile. 

To display the data on the screen, the Instagram is calling a custom API based on the provided username. For example, if the username is "zuck", say the API call would be `no-instagram-api/zuck`, which retrieves data for the "zuck" username. The actual API has the format `no-instagram-api/:username`.

`:username` is known as <i>param</i>, meaning parameters - which is the variable part of an API. 

```
app.get('/hello/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello ${username}, nice to meet you.`);
});
```
#### Using local Array database
Imagine a database as a stack of information. For example, Instagram's database might have a cluster of user information, including username, name, bio, and so on. Each piece of data in this cluster can be separated by the unique username.

Let's create a dummy Instagram user database using JSON code (don't worry if you're not familiar with it yet, it's easy to learn and is just an array of objects).


```
const allUsers = [
    {
        "username" : "zuck",
        "name" : "Mark Zuckerburg",
        "bio" : "I keep passwords as plain texts",
    },
    {
        "username" : "esaverin",
        "name" : "Eduardo Saverin",
        "bio" : "Hello World!",
    },
]
```

We have created a simple database. Now, let's write some code to display user information. Our task is to search the database for the provided username as a parameter.

```
app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  for(let i = 0; i<allUsers.length; i++){
    if(allUsers[i].username === username){
      res.send(allUsers[i]);
      break;
    }
  }
  res.send("No user found with given username");
});
```

Play around with this code on your system. To get the whole code you can check the resources section or directly go to https://github.com/Nayaker/Node-JS---Codes/tree/node-setup.


## Next Blog
In the next blog we will learn how to create a new user on local database, next blog will be about - Local database POST methods




  


