angular.module('accent-admin').controller('picturesCtrl', function ($scope, $window, $http) {
  $scope.pictures = [];

  // $http.get('/pictures').
  // success(function(data, status, headers, config) {
  //   // this callback will be called asynchronously
  //   // when the response is available
  //   data.forEach(function(row) {
  //     $scope.pictures.push(row);
  //   })
  // }).
  // error(function(data, status, headers, config) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });

  $scope.add = function(){
    var f = document.getElementById('file').files[0],
    r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      //send you binary data via $http or $resource or do anything else with it
    }
    r.readAsBinaryString(f);
  }

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
