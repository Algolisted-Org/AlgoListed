const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Specify `.Strategy`
const dotenv = require("dotenv");
const fs = require("fs");
const morgan = require("morgan");

dotenv.config({ path: "./config.env" }); // Consolidated dotenv

// Cookie parser middleware
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(express.static("uploads"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// **Session middleware needs to come before passport.session()**
const sessionOptions = {
  secret: "secrett",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // expire date 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent cross-site scripting attacks
  },
};
app.use(session(sessionOptions));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// **Passport Local Strategy** setup
passport.use(new LocalStrategy(userModel.authenticate)); // **Fix: Add parentheses**

// Serialization/deserialization
passport.serializeUser(userModel.serializeUser()); // store user information in session
passport.deserializeUser(userModel.deserializeUser()); // remove user info from session

// Routes
app.get("/", (req, res) => {
  res.send("You are using Algolisted APIs. - a Atanu Nayak production");
});

app.use("/auth", require("./Routers/router_auth"));
app.use("/resources", require("./Routers/router_resources"));
app.use("/resumes", require("./Routers/router_resumes"));
app.use("/coding-sheets", require("./Routers/coding_sheets"));
app.use("/coding-questions", require("./Routers/coding_questions"));
app.use("/blog-resources", require("./Routers/router_blog_resources"));
app.use("/user-details", require("./Routers/router_user"));
app.use("/problem-sheets", require("./Routers/router_sheets"));
app.use("/sheetproblem", require("./Routers/router_problems"));
app.use("/ai", require("./Routers/ai"));

// Server and MongoDB connection
const port = process.env.PORT || 8000;

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log("Error in setting up server!");
    return;
  }
  console.log(`App Listening at http://localhost:${port}...`);
  mongoose
    .connect(process.env.DATABASE ?? "mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connection Successful !!!");
    })
    .catch((err) => console.log(err));
});

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');
// const axios = require('axios'); // Import axios for making the API call
// require('dotenv').config({
//   path: './config.env',
// });

// const corsOptions = {
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(morgan('dev'));

// // Routes
// app.get('/', (req, res) => {
//   res.send('You are using Algolisted APIs. - a Atanu Nayak production');
// });

// app.use('/auth', require('./Routers/router_auth'));
// app.use('/resources', require('./Routers/router_resources'));
// app.use('/resumes', require('./Routers/router_resumes'));
// app.use('/coding-sheets', require('./Routers/coding_sheets'));
// app.use('/coding-questions', require('./Routers/coding_questions'));
// app.use('/blog-resources', require('./Routers/router_blog_resources'));

// // New route for calling the API
// app.get('/fetch-leetcoderanking', async (req, res) => {
//   try {
//     const apiUrl =
//       'https://leetcode.com/contest/api/ranking/weekly-contest-361/?pagination=1&region=global';
//     const response = await axios.get(apiUrl);

//     if (response.status === 200) {
//       const data = response.data;
//       const jsonData = JSON.parse(data); // Parse the response as JSON
//       res.json(jsonData); // Return the parsed JSON data as a response
//     } else {
//       res.status(response.status).json({ message: 'API request failed' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error making API request' });
//   }
// });

// const port = 1020;

// app.listen(port, '0.0.0.0', (err) => {
//   if (err) {
//     console.log('Error in setting up server!');
//     return;
//   }
//   console.log(`App Listening at http://localhost:${port}...`);
//   mongoose
//     .connect(process.env.DATABASE, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('MongoDB Connection Successful !!!');
//     })
//     .catch((err) => console.log(err));
// });
