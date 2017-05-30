angular.module("app").controller("todoCtrl", function ($scope, $http, $location, todoAPIService) {
  $scope.breadcrumbs = "Todos";
  $scope.todos = [];

  var find = () => {
      todoAPIService.find().success((data, status, headers, config) => {
        $scope.todos = data.todos;
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to fetch items.';
      });
  };

  $scope.findById = (id) => {
      todoAPIService.findById(id).success((data, status, headers, config) => {
        $scope.message = `Item ${data.todo.text} found.`;
      })
      .error((data, status, headers, config) => {
        $scope.error = 'Unable to find item.';
      });
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

  var update = (todo, id) => {
      todoAPIService.update(todo, id).success((data, status, headers, config) => {
         $scope.message = `Item ${data.todo.text} updated successfully.`;
      }).
      error((data, status, headers, config) => {
         $scope.error = 'Unable to update item.';
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

  // var testTodo = {
  //     text: 'ANOTHER TITLE',
  //     completed: false
  // };
  // var testId = '592d69e290f87601182df126';
  // update(testTodo, testId);

  find();

});
