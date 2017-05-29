angular.module("app").controller("todoCtrl", function ($scope, $http, $location, todoAPIService) {
  $scope.app = "App";
  $scope.todos = [];

  var getAll = () => {
      todoAPIService.getAll().success((data, status, headers, config) => {
        $scope.todos = data.todos;
      })
      .error((data, status, headers, config) => {
        console.log('Unable to get items: ', data);
        $scope.error = 'Unable to fetch items.';
      });
  };

  $scope.insert = (obj) => {
      todoAPIService.insert(obj).success((data, status, headers, config) => {
        getAll();
      })
      .error((data, status, headers, config) => {
        console.log('Unable to insert item: ', status);
      });
  };

  $scope.remove = (todo) => {
      todoAPIService.remove(todo).success((data, status, headers, config) => {
        getAll();
      })
      .error((data, status, headers, config) => {
        alert('Unable to remove item: ', data);
      });
  };

  $scope.findById = (id) => {
      todoAPIService.findById(id).success((data, status, headers, config) => {
        alert("Item found: " + data.todo.text);
      })
      .error((data, status, headers, config) => {
        alert('Unable to find item: ', data);
      });
  };

  var update = (todo, id) => {
      todoAPIService.update(todo, id).success((data, status, headers, config) => {
         console.log(status);
      }).
      error((data, status, headers, config) => {
         console.log(status);
         return false;
      });
  };

  // var testTodo = {
  //     text: 'Updated from angularjs and service',
  //     completed: false
  // };
  // var testId = '592c7c7ad7446322449f0607';

  //update(testTodo, testId);
  getAll();

});
