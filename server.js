var express = require('express');
var colors = require('colors');
var config = require('./config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var glob = require('glob');
var async = require('async');
var http = require('http');

var app = express();
app.use(require('body-parser').json());

async.series([
  function(cb) {
    config.server.static.app.forEach(function(p) {
      console.log('✓ Serving static files from '.bold.green + p);
      app.use('/', express.static(p));
    });

    config.server.static.lib.forEach(function(p) {
      console.log('✓ Serving libraries files from '.bold.green + p);
      app.use('/', express.static(p));
    });

    cb();
  },

  function(cb) {
    var mongoose = require('mongoose');
    mongoose.connect(config.server.db, {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    });

    async.eachSeries(config.server.documents, function(p, cb) {
      glob(p, function(err, file) {
        if (file && file.length) {
          file.forEach(function(f) {
            console.log('✓ Using model '.bold.green + f);
            require(f);
          });
          cb();
        }
      });
    }, cb);
  },

  function(cb) {
    async.eachSeries(config.server.controller, function(p, cb) {
      glob(p, function(err, files) {
        if (files && files.length) {
          files.forEach(function(f) {
            console.log('✓ Using controller '.bold.green + f);
            app.use('/', require(f));
          });
        }
        cb();
      });
    }, cb);
  }
]);

console.log('Rocking out on port %d', config.server.localport);
http.createServer(app).listen(config.server.localport);
