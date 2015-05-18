angular.module('app').controller('UnsubscribeController', ['$scope', 'Subscribers', function ($scope, Subscribers) {
  $scope.error = null;

  $scope.submit = function() {
    $scope.unsubscribed = false;
    $scope.error = null;
    var subscriber = new Subscribers ({
      address: $scope.address,
      subscribed: false
    });

    subscriber.$save(function(response) {
      $scope.unsubscribed = true;
      $scope.address = '';
      $scope.submitted = true;
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };
}]);