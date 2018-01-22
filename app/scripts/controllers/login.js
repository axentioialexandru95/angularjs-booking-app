'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LoginCtrl',['$scope', 'localStorageService', '$location', '$rootScope', '$http', '$log', 'homeService', '$window',  function ($scope, localStorageService, $location, $rootScope, $http, $log, homeService, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.mailLogin = '';
    $scope.passwordLogin = '';

    $scope.onLogin = function () {
      $rootScope.loggedIn = true;

      var ap = 248;
      var str = $scope.mailLogin + ':' + $scope.passwordLogin + '@|@' + ap;
      var key = btoa(str);
      $http.defaults.headers.common['Authorization'] = 'Basic' + btoa(str);
      localStorageService.set('basic', btoa(str));

      $http({
        url: "https://api-test.insoftd.com/v1/client/login",
        method: 'POST',
        headers: {'Authorization': 'Basic ' + btoa(str), 'Content-Type': 'application/json'},
        data: {"email": $scope.mailLogin, "password": $scope.passwordLogin, "api_key": "248"}
      }).then(function (data) {
        var id_name = data.data.records.user_details.id;

        localStorage.setItem('id_name',id_name);
        localStorage.setItem('basic', key);
        console.dir(localStorage);
        console.dir(id_name);



        if (data && data.data && data.data.records)
          return $location.path('/');
        },
        function(error) {
          localStorageService.remove('basic');
          $http.defaults.headers.common['Authorization'] = '';
          localStorage.removeItem('id_name');
          return $location.path('login');
        });
    };



  }]);


