angular.module("app").controller("testCtrl",
  function ($scope, $cordovaAppVersion) {

  document.addEventListener("deviceready", function () {

    $cordovaAppVersion.getVersionNumber().then(function (version) {
      var appVersion = version;
    });
  }, false);

  $cordovaAppVersion.getVersionCode().then(function (build) {
    var appBuild = build;
  });


  $cordovaAppVersion.getAppName().then(function (name) {
    var appName = name;
  });


  $cordovaAppVersion.getPackageName().then(function (package) {
    var appPackage = package;
  });

});
