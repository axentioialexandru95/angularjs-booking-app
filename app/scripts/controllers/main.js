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

      // Instantiate two locations
      var uluru = {lat: -25.363, lng: 131.044};
      var uluru1 = {lat: -26.363, lng: 132.044};

      // Instantiates the Gmaps Map
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
      });

      // Instantiates bounds

      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(47.1690611, 27.6199462),
        new google.maps.LatLng(45.6542889, 20.9462472)
      );

      // Options
      var options = {
        bounds: defaultBounds
      };

      // Autocomplete with places from Gmaps
      var pickup = document.getElementById('pickup');
      var dropoff = document.getElementById('dropoff');


      var autocomplete = new google.maps.places.Autocomplete(pickup, options);
      var autocomplete2 = new google.maps.places.Autocomplete(dropoff, options);

      // var places = new google.maps.places.PlacesService(map);
      //
      // autocomplete.addListener('place_changed', onPlaceChanged);
      //
      // function onPlaceChanged() {
      //   var place = autocomplete.getPlace();
      //   if (place.geometry) {
      //     map.panTo(place.geometry.location);
      //     map.setZoom(10);
      //     search();
      //   } else {
      //     document.getElementById('pickup').placeholder = 'Enter a city';
      //   }
      // }
      //
      // autocomplete.addListener('place_changed', function() {
      //   infowindow.close();
      //   marker.setVisible(false);
      //   var place = autocomplete.getPlace();
      //   if (!place.geometry) {
      //     // User entered the name of a Place that was not suggested and
      //     // pressed the Enter key, or the Place Details request failed.
      //     window.alert("No details available for input: '" + place.name + "'");
      //     return;
      //   }
      //
      //   // If the place has a geometry, then present it on a map.
      //   if (place.geometry.viewport) {
      //     map.fitBounds(place.geometry.viewport);
      //   } else {
      //     map.setCenter(place.geometry.location);
      //     map.setZoom(17);  // Why 17? Because it looks good.
      //   }
      //   marker.setPosition(place.geometry.location);
      //   marker.setVisible(true);
      //
      //   var address = '';
      //   if (place.address_components) {
      //     address = [
      //       (place.address_components[0] && place.address_components[0].short_name || ''),
      //       (place.address_components[1] && place.address_components[1].short_name || ''),
      //       (place.address_components[2] && place.address_components[2].short_name || '')
      //     ].join(' ');
      //   }
      //
      //
      //
      //   infowindowContent.children['place-icon'].src = place.icon;
      //   infowindowContent.children['place-name'].textContent = place.name;
      //   infowindowContent.children['place-address'].textContent = address;
      //   infowindow.open(map, marker);
      // });
      //
      // // Instantiates markers
      // var infowindow = new google.maps.InfoWindow();
      // var infowindowContent = document.getElementById('infowindow-content');
      // infowindow.setContent(infowindowContent);
      // var marker = new google.maps.Marker({
      //   map: map,
      //   anchorPoint: new google.maps.Point(0, -29)
      // });
      // var marker2 = new google.maps.Marker({
      //   position: uluru1,
      //   map: map
      // });



    }
    setTimeout(function(){
      initMap();
    }, 2000);


  });
