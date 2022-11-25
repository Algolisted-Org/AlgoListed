const express = require('express');
const app = express();

// const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config({
  path: './config.env',
});

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.get('/', (req, res) => {
  res.send('Hello World, backend has succesfully been started.');
});

app.use('/auth', require('./Routers/router_auth'));
app.use('/resources', require('./Routers/router_resources'));


//connect to database
// mongoose
//   .connect(process.env.DATABASE)
//   .then(() => {
//     console.log('Connected to database');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(process.env.PORT || 8000 ,'0.0.0.0' , (err)=> {
  if(err){
      console.log("Error in setting up server!");
      return;
  }
  console.log("Server running!");
})