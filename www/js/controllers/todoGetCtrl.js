app.controller("todoGetCtrl",
  function ($scope, $http, $location, todoAPIService) {

  $scope.breadcrumbs = {
    title: 'App Name . Todos',
    url: 'dashboard'
  };

  $scope.todos = [];

  var find = function() {
      todoAPIService.find().success(function(data, status, headers, config) {
        $scope.todos = data.todos;
      }).error(function(data, status, headers, config) {
        $scope.error = 'Unable to fetch items.';
      });
  };

  find();
    
});
