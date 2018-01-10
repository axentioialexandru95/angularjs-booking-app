'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PrefixesCtrl
 * @description
 * # PrefixesCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('PrefixesCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.passenger = {
      prefix:  ''
    };

    $http.get('/data/prefixes.json')
      .then(
        function (response) {
          var prefixes = response;
          $scope.prefixes = prefixes.data;
          $scope.passenger.prefix = prefixes.data[0].Code;


    },
        function (response) {
          console.dir("GET METHOD DIDN'T WORK" + response);
        });

  }]);


