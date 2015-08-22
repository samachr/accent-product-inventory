angular.module('accent-admin').controller('stockCtrl', function ($scope, $window, $http) {
  $scope.inventoryItems = [];
  $scope.images = [];
  $scope.brands = [];
  $scope.loaded = false;

  $scope.tabstock = (window.location.hash === '#stock');

  $scope.activateTab = function (tab) {
    window.location.hash = tab;

    if(!$scope.loaded) {
      $scope.load();
    }
  };

  $scope.load = function() {
    $http.get('/inventory-item').
    success(function(products, status, headers, config) {
        $http.get('/brands').
        success(function(data, status, headers, config) {
          data.forEach(function(row) {
            row.id = row.id.toString();
            $scope.brands.push(row);
          })
            $http.get('/images').
            success(function(data, status, headers, config) {
              data.forEach(function(row) {
                $scope.images.push(row.filename);
              })
              products.forEach(function(row) {
                $scope.inventoryItems.push(row);
              })
            });
        });
    });
    $scope.loaded = true;
  };

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
      $scope.newInventoryItem.id = "available after refresh";
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
