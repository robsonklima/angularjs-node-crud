angular.module("app").config(function ($routeProvider, $httpProvider) {

    // avoid browser cash
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Mains
    $routeProvider.when("/todo.get", {
       templateUrl: "views/todo.get.html",
       controller: "todoGetCtrl"
    });
    $routeProvider.when("/todo.add", {
       templateUrl: "views/todo.add.html",
       controller: "todoAddCtrl"
    });
    $routeProvider.when("/todo.utd/:id", {
       templateUrl: "views/todo.utd.html",
       controller: "todoUtdCtrl"
    });

    // dashboard
    $routeProvider.when("/dashboard", {
       templateUrl: "views/dashboard.html",
	     controller: "dashboardCtrl"
    });

    // Error and tests
    $routeProvider.when("/error", {
       templateUrl: "views/error.html"
    });
    $routeProvider.when("/test", {
       templateUrl: "views/test.html",
       controller: "testCtrl"
    });

    // Redirect
    $routeProvider.otherwise({redirectTo: "/error"});
});