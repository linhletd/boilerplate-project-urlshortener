'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var cors = require('cors');
var bodyParser = require('body-parser');
var controllers = require('./controllers.js');
var app = express();


// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true}).then(() =>{console.log("haha")})
// .catch((err)=> {console.log(err)});
mongoose.connection.on('open', function() {
console.log('Mongoose connected.');
});
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.post("/api/shorturl/new", controllers.postURLHandler);
app.get("/api/shorturl/:urlid", controllers.getURLHandler);

app.listen(port, function () {
  console.log('Node.js listening ...');
});
