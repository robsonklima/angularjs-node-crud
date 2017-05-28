angular.module("app").config(function ($routeProvider, $httpProvider) {

    // evita cache do navegador
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // dashboard
    $routeProvider.when("/todos", {
       templateUrl: "views/todo.html",
       controller: "indexCtrl"
    });

    $routeProvider.when("/error", {
       templateUrl: "views/error.html"
    });
    $routeProvider.otherwise({redirectTo: "/error"});
});
