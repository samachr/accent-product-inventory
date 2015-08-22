angular.module('accent-admin').controller('reportsCtrl', function ($scope, $window, $http) {
  $scope.reports = [];
  $scope.loaded = false;

  if(window.location.hash === "") {
    window.location.hash = 'reports';
  }
  $scope.tabusers = (window.location.hash === '#reports');

  $scope.activateTab = function (tab) {
    window.location.hash = tab;

    if(!$scope.loaded) {
      $scope.load();
    }
  };
  
  $scope.load = function() {
    $http.get('/reports/sales/all').
    success(function(data, status, headers, config) {
      data.name = "Salon Totals";
      $scope.reports.push(data);
    }).
    error(function(data, status, headers, config) {

    });

    $http.get('/users').
    success(function(userdata, status, headers, config) {
      userdata.forEach(function(row) {
        $http.get('/reports/sales/' + row.id).
        success(function(data, status, headers, config) {
          data.moneyOwed = (row.commissionrate * data.totalIncomeFromSales).toFixed(2);
          if('name' in data) $scope.reports.unshift(data);
        }).
        error(function(data, status, headers, config) {

        });
      })
    }).
    error(function(data, status, headers, config) {

    });
  $scope.loaded = true;
  };

  $scope.putUser = function(user) {
    $http.put('/reports/sales/'+user.id, user).
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
    $http.post('/reports/sales', $scope.newUser).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      if (!$scope.newUser.id) {$scope.newUser.id="Available after Page Refresh"};
      $scope.reports.unshift($scope.newUser);
      $scope.newUser = {};
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data, status);
    });
  };
});
