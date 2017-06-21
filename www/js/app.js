var app = angular.module("app", ["ngRoute", "ngMessages", "ngMaterial", "ngCordova", "uiGmapgoogle-maps"])
  .run(['$rootScope', '$location', '$http', '$cordovaNetwork', function ($rootScope, $location, $http, $cordovaNetwork) {

    // Verify Network Connection
    document.addEventListener("deviceready", function () {
        $rootScope.isConnected = $cordovaNetwork.isOnline();
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          $rootScope.isConnected = true;
        });
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          $rootScope.isConnected = false;
        });
    }, false);

}]);
