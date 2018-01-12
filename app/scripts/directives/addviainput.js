'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:addViaInput
 * @description
 * # addViaInput
 */
angular.module('angularApp')
  .directive('addViaInput', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/viaTemplate.html',
      controller: function ($rootScope, $scope, $element) {
        $scope.contacts = $rootScope.GetContactTypes;
      }
    };
  });
