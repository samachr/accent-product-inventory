angular.module('accent-admin').controller('transactionsCtrl', function ($scope, $window, $http) {
  $scope.transactions = [];

  $scope.tabtransaction = (window.location.hash === '#transactions');
  $scope.activateTab = function (tab) {
    window.location.hash = tab;
    console.log(tab);
  };
  
  $http.get('/transactions').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    data.forEach(function(row) {
      $scope.transactions.push(row);
    })
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
