angular.module('accent-admin').controller('imagesCtrl', function($scope, $window, $http) {
  $scope.images = [];
  $scope.loaded = false;

  $scope.tabimages = (window.location.hash === '#images');
  $scope.activateTab = function (tab) {
    window.location.hash = tab;

    if(!$scope.loaded) {
      $scope.load();
    }
  };

  $scope.load = function() {
    $http.get('/images').
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      data.forEach(function(row) {
        $scope.images.push(row.filename);
        // console.log(row.filename);
      })
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    $scope.loaded = true;
  };

  $scope.updateImage = function(image) {
    $scope.file = document.getElementById('userPhoto').files[0];
    var formData = new FormData();
    formData.append("files", [document.getElementById('userPhoto').files[0]]);
    formData.append("hello", "Im here");


    setTimeout(function(){
      console.log(formData.files);
      console.log($scope.file);
      console.log(formData);
      $http({
        method: 'POST',
        url: '/images',
        headers: {
          'Enc-Type': 'multipart/form-data'
        },
        data: {
          formData
        }
      }).
      then(function(result) {
        console.log(result);
      });
    }, 1000);
  };
});
