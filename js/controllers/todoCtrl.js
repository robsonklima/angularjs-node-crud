angular.module("app").controller("todoCtrl", function ($scope, $http, $location, todoAPIService) {
  $scope.app = "App";
  $scope.todos = [];

  var getAll = () => {
      todoAPIService.getAll().success((data, status, headers, config) => {
        $scope.todos = data.todos;
      }).error((data, status, headers, config) => {
        console.log('Unable to get items: ', data);
        $scope.error = 'Unable to fetch items.';
      });
  };

  $scope.insert = (obj) => {
      todoAPIService.insert(obj).success((data, status, headers, config) => {
        getAll();
      }).error((data, status, headers, config) => {
        alert('Unable to insert item');
        console.log('Unable to insert item: ', data);
      });
  };

  $scope.remove = (todo) => {
      todoAPIService.remove(todo).success((data, status, headers, config) => {
        getAll();
      }).error((data, status, headers, config) => {
        alert('Unable to remove item: ', data);
      });
  };

  $scope.findById = (id) => {
      todoAPIService.findById(id).success((data, status, headers, config) => {
        alert("Item found: " + data.todo.text);
      }).error((data, status, headers, config) => {
        alert('Unable to find item: ', data);
      });
  };

  var update = (todo, id) => {
      $http({
         url: 'http://localhost:3000/todos/' + id,
         method: 'PUT',
         params: todo
      }).success((data, status, headers, config) => {
        console.log('Item updated successfully: ', data);
      }).error((data, status, headers, config) => {
        console.log(data);
      });
  };

  //update({text: 'Todo updated from angular', completed: true}, "592a0b48375b9c440ed21560");
  getAll();

});
