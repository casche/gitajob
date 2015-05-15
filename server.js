// server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var config = require('./config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var mongoose = require('mongoose');
var glob = require("glob");
var path = require('path');

console.log("Connecting to " + config.db);
mongoose.connect(config.db);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  console.log('Boostraping');
  glob('./app/models/**/*.js', null, function(err, files){
    files.forEach(function(modelPath) {
      console.log('loading ' + modelPath);
      require(path.resolve(modelPath));
    });
  });
  glob('./app/templates/*', null, function(err, files){
    files.forEach(function(modelPath) {
      console.log('template  ' + modelPath);
    });
  });
  glob('./app/controllers/**/*.js', null, function(err, files){
    files.forEach(function(modelPath) {
      console.log('loading ' + modelPath);
      require(path.resolve(modelPath));
    });
  });
  glob('./app/services/**/*.js', null, function(err, files){
    files.forEach(function(modelPath) {
      console.log('loading ' + modelPath);
      require(path.resolve(modelPath));
    });
  });
  glob('./app/routes/**/*.js', null, function(err, files){
    files.forEach(function(modelPath) {
      console.log('loading ' + modelPath);
      require(path.resolve(modelPath))(app);
    });
  });

  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(express.static(__dirname + '/public'));
  app.listen(port);

  console.log('Magic happens on port ' + port);
  exports = module.exports = app;
});

