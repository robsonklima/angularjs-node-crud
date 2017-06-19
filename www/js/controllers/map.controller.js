app.controller("mapCtrl", function ($scope, $cordovaGeolocation, geoLocationAPIService) {
    
    $scope.options = { scrollwheel: false };
    $scope.map = { center: { latitude: null, longitude: null } };
    $scope.markers = [];
    
    $scope.places = [
        { id: 1, title: 'Casa do Pai', address: 'Rua Neiva da Costa 867 Gravataí RS'},
        { id: 2, title: 'Minha Casa', address: 'Rua Pinto Bandeira 461 Gravataí RS'},
        { id: 3, title: 'Centro', address: 'Rua José Loureiro da Silva Centro Gravataí RS'},
        { id: 4, title: 'Cachoeirinha', address: 'Cachoeirinha RS'},
        { id: 5, title: 'Porto Alegre', address: 'Porto Alegre RS'},
        { id: 6, title: 'Maringá', address: 'Maringá Paraná'},
        { id: 7, title: 'Rio de Janeiro', address: 'Rio de Janeiro RJ'},
        { id: 8, title: 'Gramado', address: 'Gramado RS'},
        { id: 9, title: 'Passo Fundo', address: 'Passo Fundo RS'},
        { id: 10, title: 'Carazinho', address: 'Carazinho RS'},
        { id: 11, title: 'Chapecó', address: 'Chapecó RS'},
        { id: 12, title: 'Viamão', address: 'Viamão RS'},
        { id: 12, title: 'São Léo', address: 'São Leopoldo RS'},
        { id: 12, title: 'Parobé', address: 'Parobé RS'},
        { id: 12, title: 'Sapiranga', address: 'Sapiranga RS'},
        { id: 12, title: 'Barra do Ribeiro', address: 'Barra do Ribeiro RS'},
        { id: 13, title: 'São Paulo', address: 'São Paulo SP'}
    ];
    
    $scope.loading = true;
    
    $scope.errors = [];
    
    var posOptions = {timeout: 20000, enableHighAccuracy: true};
    
    document.addEventListener("deviceready", function () {
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
          var myLat = position.coords.latitude;
          var myLng = position.coords.longitude;
          
          $scope.map = { center: { latitude: myLat, longitude: myLng }, zoom: 10 };
          
          $scope.markers.push({ id: 9999, latitude: myLat, longitude: myLng, title: "Minha Localização",
              "icon":"http://maps.google.com/mapfiles/ms/icons/blue.png" });
          
          angular.forEach($scope.places, function(value, key) {
              geoLocationAPIService.findByAddress($scope.places[key].address).success(function(data, status) {
                if (data.status !== 'OK') {
                    $scope.places[key].formattedAddress = 'Unable to find address.';
                    return
                }

                $scope.places[key].latitude = data.results[0].geometry.location.lat;
                $scope.places[key].longitude = data.results[0].geometry.location.lng;
                $scope.places[key].formattedAddress = data.results[0].formatted_address;
                geoLocationAPIService.findDrivingRoute(myLat, myLng, $scope.places[key].latitude, $scope.places[key].longitude).success(function(data, status) {
                  if (data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                      $scope.places[key].distance = 'Unable to find distance.';          
                      $scope.places[key].duration = 'Unable to find duration.';            
                      return
                  }

                  $scope.places[key].distance = data.rows[0].elements[0].distance.text;
                  $scope.places[key].duration = data.rows[0].elements[0].duration.text;
                    
                  $scope.markers.push({ 
                      id: key, 
                      latitude: $scope.places[key].latitude, 
                      longitude: $scope.places[key].longitude, 
                      title: $scope.places[key].title 
                        + "<br/>" 
                        + $scope.places[key].formattedAddress
                        + "<br/>" 
                        + $scope.places[key].distance
                        + ", " 
                        + $scope.places[key].duration,
                      icon: "http://maps.google.com/mapfiles/ms/icons/red.png"
                  });
                    
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
