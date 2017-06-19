app.controller("placeFindCtrl", function ($scope, $cordovaGeolocation, geoLocationAPIService) {

    $scope.place = null;
    $scope.place = [];
    $scope.errors = [];
    $scope.findByAddress = function(searchedAddress) {
        if (!searchedAddress)
            return
        
        var posOptions = {timeout: 20000, enableHighAccuracy: true};
        document.addEventListener("deviceready", function () {
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                $scope.myLat = position.coords.latitude;
                $scope.myLng = position.coords.longitude;

                geoLocationAPIService.findByAddress(searchedAddress).success(function(data, status) {
                if (data.status !== 'OK') {
                    $scope.place.formattedAddress = 'Unable to find address.';
                    $scope.place.distance = 'Unable to find distance.';
                    $scope.place.duration = 'Unable to find duration.';
                    return
                }

                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                $scope.place.formattedAddress = data.results[0].formatted_address;
                geoLocationAPIService.findDrivingRoute($scope.myLat, $scope.myLng, lat, lng).success(function(data, status) {
                  if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                      $scope.place.distance = 'Unable to find distance.';
                      $scope.place.duration = 'Unable to find duration.';
                      return
                  }

                  $scope.place.distance = data.rows[0].elements[0].distance.text;
                  $scope.place.duration = data.rows[0].elements[0].duration.text;
                }).error(function(data, status) {
                    $scope.place.distance = 'Unable to find distance.';          
                    $scope.place.duration = 'Unable to find duration.';          
                });
                }).error(function(data, status) {
                  $scope.place.formattedAddress = 'Unable to find address.';
                });

            }, function(error) {
                $scope.errors.push({details: error.message});
            }).finally(function() {
              $scope.loading = false;
            });
        }, false);
        
    }
  
    
});