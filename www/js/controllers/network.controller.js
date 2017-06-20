app.controller('networkCtrl', function($scope, $rootScope, $cordovaNetwork) {

  document.addEventListener("deviceready", function () {

    $scope.networkType = $cordovaNetwork.getNetwork()

    $scope.isOnline = $cordovaNetwork.isOnline()
    $scope.isOffline = $cordovaNetwork.isOffline()

    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      $scope.isOnline = true;
      $scope.isOffline = false;
    })

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $scope.isOffline = true;
      $scope.isOnline = false;
    })

  }, false);
    
});