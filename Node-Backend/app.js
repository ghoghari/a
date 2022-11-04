var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
global.Constant = require('./config/constants');
global.Message = require('./config/messages');
const apiRoutes = require('./config/routes/api')

const fs = require('fs');
require("dotenv").config()
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connecting mongoDB
const config = require("./config/init");
mongoose.Promise = global.Promise;
mongoose.connect(
  config.database,
  { useNewUrlParser: true },
  function (error, database) {
    if (error) {      
	  console.log('Could not connect to mongodb database!, Error:',error);
    } else {
      console.log('MongoDB database has been connected successfully!');
    }
  }
);

app.use(cors({
  origin: '*'
}));

//app.use(bodyParser.urlencoded({extended: false,}),)

//All router
app.use('/api', apiRoutes);

// install sample data so that you can access admin
const DemoDataController = require('./controller/demo-data.controller');
app.get('/api/install', DemoDataController.demo_data);

const dataPath = './data/customer.json';
app.get('/api/file-customers', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    res.send({response : true, message : "All the customers from the file have been retrieved successfully." , data : JSON.parse(data)})
  });
});
module.exports = app;

// Send all other requests to the Angular app
app.get('/node/angular/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../vkup1-angular10/dist/index.html'));
});

app.get('/', function (req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

