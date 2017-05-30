angular.module("app").controller("todoUtdCtrl", function ($scope, $http, $location, $route, $routeParams, todoAPIService) {

  $scope.breadcrumbs = {
      title: 'App Name . Todos . Update',
      url: 'todo.get'
  };

  var findById = (id) => {
      todoAPIService.findById(id).success((data, status, headers, config) => {
        $scope.todo = data.todo;
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to find item.';
      });
  };

  $scope.update = (todo) => {
      todoAPIService.update(todo).success((data, status, headers, config) => {
         $scope.message = `Item ${data.todo.text} updated successfully.`;
      }).
      error((data, status, headers, config) => {
         $scope.error = 'Unable to update item.';
      });
  };

  findById($route.current.params.id);

});
