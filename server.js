// server.js

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
    
// var db = require('./config/db');
var port = process.env.PORT || 8080; 

// mongoose.connect(db.url); 

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 

// require('./app/routes')(app); 
app.listen(port);               
console.log('Magic happens on port ' + port);
exports = module.exports = app;                         

/*
var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res) {
	var url = 'https://github.com/about/jobs';

	request(url, function(error, response, html) {
		if (!error && response.statusCode == 200) {
	        var $ = cheerio.load(html);

	    	var title, release, rating;
	    	var json = { title : "", release : "", rating : ""};

		    $('div .jobs-open-positions li a').each(function(index, element) {
		    	console.log($(this).attr('href'));
		    });
			res.send('ok');
		}
	});
});
*/
