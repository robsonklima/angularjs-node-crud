app.factory("todoAPIService", function($http, constants) {

    var _find = function() {
        return $http({
            url: constants.apiUrl + 'todos/',
            method: 'GET'
        });
    }

    var _findById = function(id) {
        return $http({
            url: constants.apiUrl + 'todos/' + id,
            method: 'GET'
        });
    }

    var _insert = function(obj) {
        return $http({
            url: constants.apiUrl + 'todos/',
            method: 'POST',
            data: obj
        });
    }

    var _update = function(obj) {
        return $http({
           url: constants.apiUrl + 'todos/' + obj.id,
           method: 'PUT',
           data: obj
        })
    }

    var _remove = function(obj) {
        return $http({
           url: constants.apiUrl + 'todos/' + obj.id,
           method: 'DELETE'
        });
    }

    return {
        find: _find, 
        findById: _findById, 
        insert: _insert, 
        update: _update, 
        remove: _remove
    };
});
