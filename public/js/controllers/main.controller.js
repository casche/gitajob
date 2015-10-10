angular.module('app')
  .controller('MainController', ['$scope', 'Scrapes', 'Subscribers', function($scope, Scrapes, Subscribers) {
    $scope.find = function() {
      $scope.scrapes = Scrapes.query();
    };

    $scope.submit = function() {
      $scope.error = '';
      var subscriber = new Subscribers({
        address: $scope.address,
        subscribed: true
      });

      subscriber.$save(function(response) {
        $scope.subscribed = true;
        $scope.address = '';
        $scope.submitted = true;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }]);
