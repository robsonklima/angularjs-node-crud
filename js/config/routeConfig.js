angular.module("app").config(function ($routeProvider, $httpProvider) {

    // avoid browser cash
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Todos
    $routeProvider.when("/todos", {
       templateUrl: "views/todos.html",
       controller: "todoCtrl"
    });

    // dashboard
    $routeProvider.when("/dashboard", {
       templateUrl: "views/dashboard.html"
    });

    // Error
    $routeProvider.when("/error", {
       templateUrl: "views/error.html"
    });

    // Redirect
    $routeProvider.otherwise({redirectTo: "/error"});
});
