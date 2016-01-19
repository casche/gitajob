var cheerio = require('cheerio');

module.exports = (function() {
  'user strict';

  return {

    jobCount: function(html) {
      var $ = cheerio.load(html);
      return $('div .jobs-open-positions li a').length;
    },

    getJobUrls: function(html) {
      var $ = cheerio.load(html);
      var urls = [];
      $('div .jobs-open-positions li a').each(function() {
        urls.push($(this).attr('href'));
      });

      return urls;
    },

    job: function(jobUrl, html) {
      var $ = cheerio.load(html);
      return  {
        url: jobUrl,
        title: $('.posting-headline h2').text(),
        location: $('.posting-headline .posting-categories .sort-by-time').text(),
        classification: $('.posting-headline .posting-categories .sort-by-commitment').text(),
        lastSeen: Date.now()
      };
    }
  };
})();
