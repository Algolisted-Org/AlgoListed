/*
// The entry point of the server file


var express = require("express")
var app = express() ;
var dotenv = require('dotenv') ;
dotenv.config();
const mongoose = require('./Models/config');
const cors = require('cors');
//const nodemailer=require("./Utils/nodemailer");


//Starting middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;
app.use(cors()) ;
app.use('/',require('./Routers/router_user'));
app.use('/admin',require('./Routers/router_admin')) ;
//End of middlewares



app.listen(process.env.PORT || 5000,'0.0.0.0' , (err)=> {
    if(err){
        console.log("Error in setting up server!");
        return;
    }
    console.log("Server running!");
})
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config({
  path: './config.env',
});

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/', require('./Routers/resourcesRoute'));

//connect to database
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(`Error in setting up server!`);
    return;
  }
  console.log(`Server running! on port ${port}`);
});
