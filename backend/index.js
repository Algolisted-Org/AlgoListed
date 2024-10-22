const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config({ path: "./config.env" });

// Middleware
app.use(cookieParser());
app.use(compression()); // Enable compression
app.use(helmet()); // Secure HTTP headers
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

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

const port = process.env.PORT || 8000;

// MongoDB connection using async/await
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE || "mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 5, // Connection pool size
    });
    console.log("MongoDB Connection Successful !!!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log("Error in setting up server!");
    return;
  }
  console.log(`App Listening at http://localhost:${port}...`);
  connectDB(); // Call the async function to connect to the database
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
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
