angular.module('accent-admin').controller('stockCtrl', function ($scope, $window, $http) {
  $scope.inventoryItems = [];

  $http.get('/inventory-item').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    data.forEach(function(row) {
      $scope.inventoryItems.push(row);
    })
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.putItem = function(inventoryItem) {
    $http.put('/inventory-item/'+inventoryItem.id, inventoryItem).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(inventoryItem, data, status);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };


  $scope.postItem = function() {
    $http.post('/inventory-item', $scope.newInventoryItem).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.inventoryItems.unshift($scope.newInventoryItem);
      $scope.newInventoryItem = {};
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };
});
