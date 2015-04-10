angular.module('app').controller('MainController', ['$scope', 'Scrapes', function ($scope, Scrapes) {
  $scope.find = function() {
    $scope.scrapes = Scrapes.query();
  };
}]);