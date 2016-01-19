/* global angular */
'use strict';

angular.module('app')
  .controller('StatsController', ['$scope', 'Scrapes', 'AverageScrapes', '$http',
   function($scope, Scrapes, AverageScrapes, $http) {
    $scope.find = function() {
      $scope.scrapes = Scrapes.query();
      $scope.averageScrapes = AverageScrapes.query({aggregate: null});
      $scope.averageScrapesDayOfWeek =  AverageScrapes.query({aggregate: 'dayOfWeek'})
    };

    $http.get('scrapes/chart/month').then(function(response) {
      console.log(response.data.series[0][0].x);
        new Chartist.Line('#ct-line', response.data, {
          axisY: {
            onlyInteger: true,
          },
          axisX: {
            labelInterpolationFnc: function(value) {
              return value.month + "/" + value.year;
            }
          }
        });
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
      $scope.averageLifespan = moment.duration(response.data[0].averageLifespan, "milliseconds").format("W[W:]D[D:]H[H]");
    });

    $http.get('gitjobs/engineerlifespan').then(function(response) {
      $scope.engineerlifespan = moment.duration(response.data[0].averageLifespan, "milliseconds").format("W[W:]D[D:]H[H]");
    });

    var remoteCount = $http.get('gitjobs/remote/count');
    var notRemoteCount =  $http.get('gitjobs/notremote/count');

    Q.all([remoteCount, notRemoteCount]).then(function(data) {
      new Chartist.Pie('#ct-pie', {
        series: [data[0].data[0].count, data[1].data[0].count]
      });
    });
}]);
