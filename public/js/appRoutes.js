/* global angular */
angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.view.html',
        controller: 'MainController'
      })
      .when('/unsubscribe', {
        templateUrl: 'views/unsubscribe.view.html',
        controller: 'UnsubscribeController'
      })
      .when('/stats', {
        templateUrl: 'views/stats.view.html',
        controller: 'StatsController'
      });
  }]);
