angular.module('accent-admin').controller('userCtrl', function ($scope, $window, $http) {
  $scope.users = [];
  $scope.loaded = false;

  $scope.tabusers = (window.location.hash === '#users');

  $scope.activateTab = function (tab) {
    window.location.hash = tab;

    if(!$scope.loaded) {
      $scope.load();
    }
  };

  $scope.load = function() {
    $http.get('/users').
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      data.forEach(function(row) {
        $scope.users.push(row);
      })
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    $scope.loaded = true;
  };

  $scope.putUser = function(user) {
    $http.put('/users/'+user.id, user).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(user, data, status);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };

  $scope.postUser = function() {
    $http.post('/users', $scope.newUser).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      if (!$scope.newUser.id) {$scope.newUser.id="Available after Page Refresh"};
      $scope.users.unshift($scope.newUser);
      $scope.newUser = {};
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };
});
