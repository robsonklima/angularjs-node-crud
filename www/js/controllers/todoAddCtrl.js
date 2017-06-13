app.controller("todoAddCtrl",
  function ($scope, $http, $location, $mdToast, todoAPIService) {

  $scope.insert = function(obj) {
      todoAPIService.insert(obj).success(function(data) {
        $mdToast.show($mdToast.simple().textContent('Item ' + data.details.insertId + ' added.')
          .hideDelay(1000).position('top right'));
          
          $scope.todo = null;
      }).error(function(data, status, headers, config) {
        $mdToast.show($mdToast.simple().textContent('Unable to insert item.')
          .hideDelay(1000).position('top right'));
      });
  };
});
