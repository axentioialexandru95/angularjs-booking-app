'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function initMap() {
      var uluru = {lat: -25.363, lng: 131.044};
      var uluru1 = {lat: -26.363, lng: 132.044};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
      var marker2 = new google.maps.Marker({
        position: uluru1,
        map: map
      });

      var drawingManager = new google.maps.drawing.DrawingManager();

      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(47.1690611, 27.6199462),
        new google.maps.LatLng(45.6542889, 20.9462472)
      );

      var options = {
        bounds: defaultBounds
      };

      var input = document.getElementById('pac-input');

      var input1 = document.getElementById('pac-input1');

      var autocomplete = [new google.maps.places.Autocomplete(input, options), ];

      var autocomplete1 = new google.maps.place.Autocomplete(input1, options);

      drawingManager.setMap(map);
    }
    setTimeout(function(){
      initMap();
    }, 2000);


  });
