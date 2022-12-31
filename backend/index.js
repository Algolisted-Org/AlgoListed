const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


const morgan = require('morgan');
require('dotenv').config({
  path: './config.env',
});

const corsOptions ={
  // origin: 'http://localhost:3000/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors());

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.get('/', (req, res) => {
  res.send('Hello World 2, backend has succesfully been started.');
});

app.use('/auth', require('./Routers/router_auth'));
app.use('/resources', require('./Routers/router_resources'));
app.use('/resumes', require('./Routers/router_resumes'));
app.use('/coding-sheets', require('./Routers/coding_sheets'));
app.use('/blog-resources', require('./Routers/router_blog_resources'));

const port = process.env.PORT || 8000;

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log("Error in setting up server!");
    return;
  }
  console.log(`App Listening at http://localhost:${port}...`);
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connection Successful !!!')
  }).catch((err) => console.log(err));
})