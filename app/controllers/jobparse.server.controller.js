'user strict';

var cheerio = require('cheerio');
var S = require('string');

exports.jobCount = function(html) {
  var $ = cheerio.load(html);
  return $('div .jobs-open-positions li a').length;
};

exports.getJobUrls = function(html, each) {
  var $ = cheerio.load(html);
  $('div .jobs-open-positions li a').each(function () {
    each($(this).attr('href'))
  });
};

exports.job = function(jobUrl, html) {
  var $ = cheerio.load(html);
  return {
    url: jobUrl,
    location: (S($('div .inner .supertitle').text())).between('/').s,
    classification: (S($('div .inner .supertitle').text())).between('', '/').s,
    title: $('div .inner h1').text(),
    firstSeen: Date.now,
    lastSeen: Date.now
  };
};