angular.module("app").factory("todoAPIService", function($http, constants) {

    var _insert = (obj) => {
        return $http.post(constants.apiUrl + "todos/", obj);
    }

    var _getAll = () => {
        return $http.get(constants.apiUrl + 'todos/');
    }

    var _findById = (id) => {
        return $http({
           url: constants.apiUrl + 'todos/' + id,
           method: 'GET'
        });
    }

    var _atualizar = (obj) => {
        return $http.post(constants.apiUrl, obj);
    }

    var _remove = (obj) => {
        return $http({
           url: constants.apiUrl + 'todos/' + obj._id,
           method: 'DELETE'
        });
    }

    return {
        getAll: _getAll,
        findById: _findById,
        insert: _insert,
        atualizar: _atualizar,
        remove: _remove
    };
});
