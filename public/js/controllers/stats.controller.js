/* global angular */
'use strict';

angular.module('app')
  .controller('StatsController', ['$scope', 'Scrapes', 'AverageScrapes', '$http',
   function($scope, Scrapes, AverageScrapes, $http) {
    $scope.moment = moment;

    $scope.find = function() {
      $scope.scrapes = Scrapes.query();
      $scope.averageScrapes = AverageScrapes.query({aggregate: null});
      $scope.averageScrapesDayOfWeek =  AverageScrapes.query({aggregate: 'dayOfWeek'})
    };

    $http.get('gitjobs/firstseen/count').then(function(response) {
      $scope.sumDayOfWeek = response.data;
    });

    $http.get('gitjobs/location/chart').then(function(response) {
      new Chartist.Bar('#ct-bar', response.data, {
        distributeSeries: true,
         seriesBarDistance: 20,
         axisX: {
           labelOffset: {
             x: 0,
             y: 0
           },
           showGrid: false,
           labelInterpolationFnc: Chartist.noop,
           scaleMinSpace: 300,
         },
         axisY: {
           onlyInteger: true
         },
         high: 60,
      });
    });

    $http.get('gitjobs/lifespan').then(function(response) {
      $scope.averageLifespan = moment.duration(response.data[0].averageLifespan, "milliseconds").format("W[w:]D[d:]H[h]");
    });

    $http.get('gitjobs/engineerlifespan').then(function(response) {
      $scope.engineerlifespan = moment.duration(response.data[0].averageLifespan, "milliseconds").format("W[w:]D[d:]H[h]");
    });

    Q.all([$http.get('gitjobs/remote/count'), $http.get('gitjobs/notremote/count')]).then(function(data) {
      new Chartist.Pie('#ct-pie', {
        labels: ['Remote', 'Not Remote'],
        series: [data[0].data[0].count, data[1].data[0].count]
      });
    });

    Q.all([$http.get('gitjobs/engineer/count'), $http.get('gitjobs/notengineer/count')]).then(function(data) {
      new Chartist.Pie('#ct-pie2', {
        labels: ['Engineer', 'Not Engineer'],
        series: [data[0].data[0].count, data[1].data[0].count]
      }, {
        donut: true
      });
    });

    $http.get('gitjobs/lifespan/list').then(function(response) {
      $scope.oldest = response.data[0].title;
      $scope.oldestAge = moment.duration(response.data[0].lifespan, "milliseconds").format("D[ days]");
    });


    $http.get('scrapes/chart/month').then(function(response) {
      new Chartist.Line('#ct-line', response.data, {
        axisY: {
          onlyInteger: true,
        },
        axisX: {
          labelInterpolationFnc: function(value) {
            return value.month + "/" + value.year;
          }
        }
      }).on('draw', function(data) {
        if(data.type === 'line') {
          data.element.animate({
            opacity: {
              begin: 0,
              dur: 500,
              from: 0,
              to: 1
            }
          });
        }
      });

    });

}]);
