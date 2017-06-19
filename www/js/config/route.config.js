app.config(function ($routeProvider, $httpProvider) {

    // avoid browser cash
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Mains
    $routeProvider.when("/", {
       templateUrl: "views/dashboard.html",
        controller: "dashboardCtrl"
    });
    $routeProvider.when("/todo.get", {
       templateUrl: "views/todo-get.html",
       controller: "todoGetCtrl"
    });
    $routeProvider.when("/todo.add", {
       templateUrl: "views/todo-add.html",
       controller: "todoAddCtrl"
    });
    $routeProvider.when("/todo.utd/:id", {
       templateUrl: "views/todo-utd.html",
       controller: "todoUtdCtrl"
    });
    $routeProvider.when("/places.get", {
       templateUrl: "views/places-get.html",
       controller: "placesGetCtrl"
    });
    $routeProvider.when("/place.find", {
       templateUrl: "views/place-find.html",
       controller: "placeFindCtrl"
    });
    $routeProvider.when("/map", {
       templateUrl: "views/map.html",
       controller: "mapCtrl"
    });

    // dashboard
    $routeProvider.when("/dashboard", {
       templateUrl: "views/dashboard.html",
	     controller: "dashboardCtrl"
    });
    $routeProvider.when("/geolocation", {
       templateUrl: "views/geo-location.html",
       controller: "geoLocationCtrl"
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
