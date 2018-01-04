'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MapCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    NgMap.getMap().then(function (NgMap) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
  });
