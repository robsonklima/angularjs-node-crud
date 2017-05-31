angular.module("app").controller("todoGetCtrl",
  function ($scope, $http, $location, todoAPIService) {

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

  find();
});
