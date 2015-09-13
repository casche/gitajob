'user strict';

var cheerio = require('cheerio');
var S = require('string');

exports.jobCount = function(html) {
  var $ = cheerio.load(html);
  return $('div .jobs-open-positions li a').length;
};

exports.getJobUrls = function(html, each) {
  var $ = cheerio.load(html);
  $('div .jobs-open-positions li a').each(function() {
    each($(this).attr('href'))
  });
};

exports.job = function(jobUrl, html) {
  var $ = cheerio.load(html);
  return {
    url: jobUrl,
    title: $('.posting-headline h2').text(),
    location: $('.posting-headline .posting-categories .sort-by-time').text(),
    classification: $('.posting-headline .posting-categories .sort-by-commitment').text(),
    lastSeen: Date.now()
  };
};
