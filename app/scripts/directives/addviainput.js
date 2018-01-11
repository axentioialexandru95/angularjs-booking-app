'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:addViaInput
 * @description
 * # addViaInput
 */
angular.module('angularApp')
  .directive('addViaInput', function ($compile) {
    return function(scope, element, attrs){
      element.bind("click", function(){
        scope.count++;
        angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-default' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>")(scope));
      });
    };
  });
