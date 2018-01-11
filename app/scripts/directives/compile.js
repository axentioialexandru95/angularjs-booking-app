'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:compile
 * @description
 * # compile
 */
angular.module('angularApp')
  .directive('addViaPlaces', function () {
    return {
      restrict: 'E',
      templateUrl: '<label class="btn btn-primary" ng-click="addTemplate()" uib-tooltip="Add Via point" ng-model="viaButton" uib-btn-checkbox><i class="glyphicon glyphicon-plus"></i> VIA</label>',
      // templateUrl: 'scripts/directives/viaTemplate.html',
    };

  });

