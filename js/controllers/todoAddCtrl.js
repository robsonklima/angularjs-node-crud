angular.module("app").controller("todoAddCtrl", function ($scope, $http, $location, todoAPIService) {

  $scope.breadcrumbs = {
      title: 'App Name . Todos . Add',
      url: 'todo.get'
  };

  $scope.insert = (obj) => {
      todoAPIService.insert(obj).success((data) => {
        $scope.message = `Item ${data.text} inserted.`;
        find();
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to insert item.';
      });
  };

});
