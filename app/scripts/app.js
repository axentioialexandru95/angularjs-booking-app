'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngIntlTelInput',
    'LocalStorageModule',
    'angularMoment'
  ])
  .config(function ($routeProvider, $locationProvider, ngIntlTelInputProvider, localStorageServiceProvider) {
    $locationProvider.hashPrefix('/');
    localStorageServiceProvider.setPrefix('angularApp');
    ngIntlTelInputProvider.set({initialCountry: 'us'});
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/testApi', {
        templateUrl: 'views/testapi.html',
        controller: 'TestapiCtrl',
        controllerAs: 'testApi'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(['$rootScope', 'localStorageService', '$location', '$http', function ($rootScope, localStorageService, $location, $http) {
    $rootScope.$on('$locationChangeStart', function (ev, data) {
      if (localStorageService.get('basic')){
        $rootScope.loggedIn = true;
        $http.defaults.headers.common['Authorization'] = 'Basic' + localStorageService.get('basic');
      }
      else {
        $location.path('/');
      }
    });
  }]);
