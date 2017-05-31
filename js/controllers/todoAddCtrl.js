angular.module("app").controller("todoAddCtrl",
  function ($scope, $http, $location, $mdToast, todoAPIService) {

  $scope.breadcrumbs = {
      title: 'App Name . Todos . Add',
      url: 'todo.get'
  };

  $scope.insert = (obj) => {
      todoAPIService.insert(obj).success((data) => {
        $mdToast.show($mdToast.simple().textContent(`Item ${data.text} added.`)
          .hideDelay(1000).position('top right'));
      }).error((data, status, headers, config) => {
        $mdToast.show($mdToast.simple().textContent('Unable to insert item.')
          .hideDelay(1000).position('top right'));
      });
  };
});
