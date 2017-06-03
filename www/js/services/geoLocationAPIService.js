angular.module("app").factory("geoLocationAPIService", function($http, constants) {

    var _findDrivingRoute = function(latOrigin, lngOrigin, latDestiny, lngDestiny) {
        return $http({
            url:'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + latOrigin + ',' + lngOrigin + '&destinations=' + latDestiny + ',' + lngDestiny + '&mode=driving&language=en-EN&key=AIzaSyCdX8k9LPBt6c3gNKOMCWlgyYmrV5AMkf8',
            method: 'GET'
        });
    }
    
    var _findByLatLong = function(lat, lng) {
        return $http({
            url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCdX8k9LPBt6c3gNKOMCWlgyYmrV5AMkf8',
            method: 'GET'
        });
    }
 
    var _findByAddress = function(address) {
        return $http({
            url:'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCdX8k9LPBt6c3gNKOMCWlgyYmrV5AMkf8',
            method: 'GET'
        });
    }
    
    return {
        findDrivingRoute: _findDrivingRoute,
        findByLatLong: _findByLatLong,
        findByAddress: _findByAddress,
    };
    
});
