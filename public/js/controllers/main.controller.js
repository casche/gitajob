angular.module('app').controller('MainController', ['$scope', 'Scrapes', 'Subscribers', function ($scope, Scrapes, Subscribers) {
  $scope.find = function() {
    $scope.scrapes = Scrapes.query();
  };

  $scope.submit = function() {
    var subscriber = new Subscribers ({
      email: $scope.email
    });

    subscriber.$save(function(response) {
      $scope.submitted = true;
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };
}]);