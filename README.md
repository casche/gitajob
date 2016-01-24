# GitaJob

A dashboard & email notifier for jobs at GitHub. Uses Heroku one-off dyno's to crawl the GitHub job site for jobs. Emails subscribers if and and only if there are new open positions at GitHub. Compiles a number of stats on a dashboard.

See http://gitajob.ninja to sign up. View the dashboard @ http://gitajob.ninja/#/status



## Usage

* npm install
* bower install
* npm start/gulp
* gulp test
* gulp lint

## Rest API


### Scrapes (Webcrawls)

``` /scrapes ``` A list of webcrawls of GitHub jobs in descending order.

``` /scrapes/avg ``` Average number of open positions  as ``` count.

 ``` /scrapes/avg/:aggregation ``` where ```:aggregation``` is one of ``` [ month, dayOfMonth, dayOfWeek, dayOfYear ]```: Average # of open positions as ```count``` for the given aggregation, ```:aggregation```.

 ``` /scrapes/chart/month ``` Average Number of open positions for each month and year formatted for Chartist.js
