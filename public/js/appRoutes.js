/* global angular */
angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      // index
      .when('/', {
        templateUrl: 'views/main.view.html',
        controller: 'MainController'
      })
      .when('/unsubscribe', {
        templateUrl: 'views/unsubscribe.view.html',
        controller: 'UnsubscribeController'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);
