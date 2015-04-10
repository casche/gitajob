angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    // index
    .when('/', {
      templateUrl: 'views/main.view.html',
      controller: 'MainController'
    });

  $locationProvider.html5Mode(true);

}]);