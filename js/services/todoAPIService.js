angular.module("app").factory("todoAPIService", function($http, constants) {

    var find = () => {
        return $http({
            url: constants.apiUrl + 'todos/',
            method: 'GET'
        });
    }

    var findById = (id) => {
        return $http({
            url: constants.apiUrl + 'todos/' + id,
            method: 'GET'
        });
    }

    var insert = (obj) => {
        return $http({
            url: constants.apiUrl + 'todos/',
            method: 'POST',
            data: obj
        });
    }

    var update = (obj, id) => {
        return $http({
           url: constants.apiUrl + 'todos/' + id,
           method: 'PATCH',
           data: obj
        })
    }

    var remove = (obj) => {
        return $http({
           url: constants.apiUrl + 'todos/' + obj._id,
           method: 'DELETE'
        });
    }

    return {find, findById, insert, update, remove};
});
