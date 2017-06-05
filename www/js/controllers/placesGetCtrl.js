angular.module("app").controller("placesGetCtrl", function ($scope, $cordovaGeolocation, geoLocationAPIService) {
    
	$scope.loading = true;
	
    $scope.places = [
        {order: 1, name: 'Casa do Pai', address: 'Rua Neiva da Costa 867 Gravataí RS'},
        {order: 2, name: 'Minha Casa', address: 'Rua Pinto Bandeira 461 Gravataí RS'},
        {order: 3, name: 'Centro', address: 'Rua José Loureiro da Silva Centro Gravataí RS'},
        {order: 4, name: 'Cachoeirinha', address: 'Cachoeirinha RS'},
        {order: 5, name: 'Porto Alegre', address: 'Porto Alegre RS'},
        {order: 6, name: 'Maringá', address: 'Maringá Paraná'},
        {order: 7, name: 'Rio de Janeiro', address: 'Rio de Janeiro RJ'},
        {order: 8, name: 'Gramado', address: 'Gramado RS'},
        {order: 9, name: 'Bento Gonçalves', address: 'asdfsdfsdf'},
        {order: 10, name: 'Caxias', address: ''},
        {order: 11, name: 'Pelotas', address: '          %'}
    ];    
    
    $scope.errors = [];
    var posOptions = {timeout: 20000, enableHighAccuracy: true};
    document.addEventListener("deviceready", function () {
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
          var myLat = position.coords.latitude;
          var myLng = position.coords.longitude;
          
          angular.forEach($scope.places, function(value, key) {
              geoLocationAPIService.findByAddress($scope.places[key].address).success(function(data, status) {
                if (data.status !== 'OK') {
                    $scope.places[key].formattedAddress = 'Unable to find address.';
                    return
                }
                    
                $scope.places[key].lat = data.results[0].geometry.location.lat;
                $scope.places[key].lng = data.results[0].geometry.location.lng;
                $scope.places[key].formattedAddress = data.results[0].formatted_address;
                geoLocationAPIService.findDrivingRoute(myLat, myLng, $scope.places[key].lat, $scope.places[key].lng).success(function(data, status) {
                  if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                      $scope.places[key].distance = 'Unable to find distance.';          
                      $scope.places[key].duration = 'Unable to find duration.';            
                      return
                  }

                  $scope.places[key].distance = data.rows[0].elements[0].distance.text;
                  $scope.places[key].duration = data.rows[0].elements[0].duration.text;
                }).error(function(data, status) {
                    $scope.places[key].distance = 'Unable to find distance.';          
                    $scope.places[key].duration = 'Unable to find duration.';          
                });
              }).error(function(data, status) {
                  $scope.places[key].formattedAddress = 'Unable to find address.';
              });
          }, $scope.places);
      }, function(error) {
          $scope.errors.push({details: error.message});
      }).finally(function() {
        $scope.loading = false;
      });
    }, false);
    
});