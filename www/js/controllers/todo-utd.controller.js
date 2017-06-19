app.controller("todoUtdCtrl",
  function ($scope, $http, $location, $route, $routeParams, $mdDialog,
    $mdToast, todoAPIService) {

  $scope.breadcrumbs = {
      title: 'App Name . Todos . Update',
      url: 'todo.get'
  };

  var findById = function(id) {
      todoAPIService.findById(id).success(function(data, status, headers, config) {
        $scope.todo = data.todos[0];
      }).error(function(data, status, headers, config) {
        $mdToast.show($mdToast.simple().textContent('Unable to find item.')
          .hideDelay(1000).position('top right'));
      });
  };

  $scope.update = function(todo) {
      todoAPIService.update(todo).success(function(data, status, headers, config) {
        $mdToast.show($mdToast.simple().textContent(data.details.affectedRows + ' item(s) updated.')
          .hideDelay(1000).position('top right'));
          $location.path('todo.get');
      }).error(function(data, status, headers, config) {
        $mdToast.show($mdToast.simple().textContent('Unable to update item.')
          .hideDelay(1000).position('top right'));
      });
  };

  $scope.remove = function(todo) {
      var confirm = $mdDialog.confirm().textContent('Are you sure to delete this item?')
        .ok('Yes').clickOutsideToClose(true).cancel('No');

      $mdDialog.show(confirm).then(function() {
        todoAPIService.remove(todo).success(function(data, status, headers, config) {
           $mdToast.show($mdToast.simple().textContent(data.details.affectedRows + ' item(s) removed.')
            .hideDelay(1000).position('top right'));
           $location.path('todo.get');
        }).error(function(data, status, headers, config) {
          $mdToast.show($mdToast.simple().textContent('Unable to remove item.')
            .hideDelay(1000).position('top right'));
        });
      });
  };

  findById($route.current.params.id);
});
