angular.module("app").controller("todoGetCtrl", function ($scope, $http, $location, todoAPIService) {

  $scope.breadcrumbs = {
    title: 'App Name . Todos',
    url: 'dashboard'
  };

  $scope.todos = [];

  var find = () => {
      todoAPIService.find().success((data, status, headers, config) => {
        $scope.todos = data.todos;
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to fetch items.';
      });
  };

  $scope.remove = (todo) => {
      todoAPIService.remove(todo).success((data, status, headers, config) => {
        $scope.message = `Item ${data.todo.text} removed.`;
        find();
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to remove item.';
      });
  };

  find();

});
