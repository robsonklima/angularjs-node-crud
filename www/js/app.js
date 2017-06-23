var app = angular.module("app", ["ngRoute", "ngMessages", "ngMaterial", "ngCordova", "uiGmapgoogle-maps"])
  .run(['$rootScope', '$location', '$http', '$cordovaNetwork', '$cordovaGeolocation', function ($rootScope, $location, $http, $cordovaNetwork, $cordovaGeolocation) {
    
    document.addEventListener("deviceready", function () {
        
        // Watch Network
        $rootScope.isConnected = $cordovaNetwork.isOnline();
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          $rootScope.isConnected = true;
        });
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          $rootScope.isConnected = false;
        });
        
        // Watch Geolocation
        function getLocation() {
          var posOptions = {timeout: 20000, enableHighAccuracy: true, repeatOn: 10000};
          $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
              $rootScope.myLatitude = position.coords.latitude;
              $rootScope.myLongitude = position.coords.longitude;
          }, function(error) {
              $rootScope.myLatitude = null;
              $rootScope.myLongitude = null;
          }).finally(function() {
              // finally
          });
          
          setTimeout(getLocation, posOptions.repeatOn);
        }

        getLocation();
    }, false);

}]);
