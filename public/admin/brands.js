angular.module('accent-admin').controller('brandsCtrl', function ($scope, $window, $http) {
  $scope.brands = [];

  $scope.tabbrands = (window.location.hash === '#brands');
  $scope.activateTab = function (tab) {
    window.location.hash = tab;
    console.log(tab);
  };
  
  $http.get('/brands').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    data.forEach(function(row) {
      $scope.brands.push(row);
    })
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.putBrand = function(brand) {
    $http.put('/brands/'+brand.id, brand).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(brand, data, status);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };

  $scope.postBrand = function() {
    $http.post('/brands', $scope.newBrand).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.newBrand.id="Available after Page Refresh";
      $scope.brands.unshift($scope.newBrand);
      $scope.newBrand = {};
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };
});
