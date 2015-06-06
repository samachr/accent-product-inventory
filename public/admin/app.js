angular.module('accent-admin', ['ui.bootstrap']);
angular.module('accent-admin').controller('tabsCtrl', function ($scope, $window) {
  $scope.tabs = [
  { title:'Dynamic Title 1', content:'Dynamic content 1' },
  { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  console.log(window.location.hash);

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
