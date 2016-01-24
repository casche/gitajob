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

Interested in the raw data? Please see the following REST API. 

### Scrapes (Webcrawls)

``` /scrapes ``` A list of webcrawls of GitHub jobs in descending order.

``` /scrapes/avg ``` Average number of open positions  as `count`.

 ` /scrapes/avg/:aggregation` Average number of open positions where `:aggregation` is one of ` [month, dayOfMonth, dayOfWeek, dayOfYear]`.

 ``` /scrapes/chart/month ``` Average Number of open positions for each month and year formatted for Chartist.js

### Gitjobs (Open Positions)

`/gitjobs` All jobs ever discovered.

`/gitjobs/:aggregate` Aggregated open position data where `:aggregate` is one of `[location, remote, lifespan, engineerlifespan]`

*  `location` # of positions at distinct locations.
*  `remote` A list of positions with a location of 'Anywhere'.
* `lifespan` average lifespan of an open position in milli seconds.
* `engineerlifespan` average lifespan of engineering positions in milli seconds.

`/gitjobs/:aggregate/chart` same as `/gitjobs/:aggregate` but formats the data for use with Chartist.js

`/gitjobs/:aggregate/count`  Number of open positions where `:aggregate` is one of `[remote, notremote, engineer, notengineer]`

*  `remote` # of positions that are have a location described as 'Anywhere'.
*  `notremote` # of positions that do not have a location described as 'Anywhere'.
*  `engineer` # of positions that are descried as 'Engineering'
*  `notengineer` # of positions that are not described as 'Engineering'

`/gitjobs/:aggregate/list` Aggregated data as a list where `:aggregate` is one of `[lifespan]`

* `lifespan` lists all jobs and their associated lifespan in milli seconds

# License

The MIT License (MIT)

Copyright (c) 2015 Christopher Asche

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
