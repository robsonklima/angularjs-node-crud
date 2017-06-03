angular.module("app").controller("geoLocationCtrl", function ($scope, $cordovaGeolocation, geoLocationAPIService) {
   
  // Geolocation
  var posOptions = {timeout: 20000, enableHighAccuracy: true};
  document.addEventListener("deviceready", function () {
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
          $scope.lat = position.coords.latitude;
          $scope.lng = position.coords.longitude;
                   
          findByLatLong($scope.lat, $scope.lng);
          findDrivingRoute($scope.lat, $scope.lng, '-29.9305881', '-50.991873');
      }, function(err) {
          $scope.error = err;
      });
      
  }, false);
    
  var findDrivingRoute = function(latOrigin, lngOrigin, latDestiny, lngDestiny) {
      geoLocationAPIService.findDrivingRoute(latOrigin, lngOrigin, latDestiny, lngDestiny).success(function(data) {
          $scope.drivingRoute = {
              origin_addresses: data.origin_addresses[0],
              destination_addresses: data.destination_addresses[0],
              distance: data.rows[0].elements[0].distance.text,
              duration: data.rows[0].elements[0].duration.text
          };      
      }).error(function(data, status, headers, config) {
        console.log('Unable to find route.')
      });
  };
    
  var findByLatLong = function(lat, lng) {
      geoLocationAPIService.findByLatLong(lat, lng).success(function(data) {
        $scope.address = data.results[0].formatted_address;
      }).error(function(data, status, headers, config) {
        console.log('Unable to find latitude and longitude.')
      });
  };
  
  var findByAddress = function(address) {
      geoLocationAPIService.findByAddress(address).success(function(data) {
        console.log(data.results[0].geometry.location.lat);
        console.log(data.results[0].geometry.location.lng);
      }).error(function(data, status, headers, config) {
        console.log('Unable to find address.')
      });
  };
    
});