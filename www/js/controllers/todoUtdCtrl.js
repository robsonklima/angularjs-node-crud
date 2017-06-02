angular.module("app").controller("todoUtdCtrl",
  function ($scope, $http, $location, $route, $routeParams, $mdDialog,
    $mdToast, todoAPIService) {

  $scope.breadcrumbs = {
      title: 'App Name . Todos . Update',
      url: 'todo.get'
  };

  var findById = (id) => {
      todoAPIService.findById(id).success((data, status, headers, config) => {
        $scope.todo = data.todo;
      })
      .error((data, status, headers, config) => {
        $mdToast.show($mdToast.simple().textContent('Unable to find item.')
          .hideDelay(1000).position('top right'));
      });
  };

  $scope.update = (todo) => {
      todoAPIService.update(todo).success((data, status, headers, config) => {
        $mdToast.show($mdToast.simple().textContent(`Item ${data.todo.text} updated.`)
          .hideDelay(1000).position('top right'));
      }).error((data, status, headers, config) => {
        $mdToast.show($mdToast.simple().textContent('Unable to update item.')
          .hideDelay(1000).position('top right'));
      });
  };

  $scope.remove = (todo) => {
      var confirm = $mdDialog.confirm().textContent('Are you sure to delete this item?')
        .ok('Yes').clickOutsideToClose(true).cancel('No');

      $mdDialog.show(confirm).then(() => {
        todoAPIService.remove(todo).success((data, status, headers, config) => {
           $mdToast.show($mdToast.simple().textContent(`Item ${data.todo.text} removed.`)
            .hideDelay(1000).position('top right'));
           $location.path('todo.get');
        }).error((data, status, headers, config) => {
          $mdToast.show($mdToast.simple().textContent('Unable to remove item.')
            .hideDelay(1000).position('top right'));
        });
      });
  };

  findById($route.current.params.id);
});
