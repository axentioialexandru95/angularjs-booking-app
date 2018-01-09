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

      // Instantiate a directions service.
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();


      // Instantiate two locations
      var iasi = {lat: 47.156116, lng: 27.5169311};
      var iasi2 = {lat: 49.156116, lng: 29.5169311};

      // Instantiates the Gmaps Map
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: iasi,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      // directionsDisplay.setPanel(document.getElementById('route'));
      directionsDisplay.setMap(map);

      // Instantiates bounds

      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(47.1690611, 27.6199462),
        new google.maps.LatLng(45.6542889, 20.9462472)
      );
      //
      // Options
      var options = {
        bounds: defaultBounds
      };

      var pickup = document.getElementById('pickup');
      var dropoff = document.getElementById('dropoff');

      var searchBox = new google.maps.places.SearchBox(pickup);
      var searchBox2 = new google.maps.places.SearchBox(dropoff);


      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        searchBox2.setBounds(map.getBounds());
      });


      var markers = [];

      searchBox2.addListener('places_changed', function () {
        var places = searchBox2.getPlaces();

        if (places.length == 0) {
          return;
        }

        markers = [];

        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // markers.push(new google.maps.Marker({
          //   map: map,
          //   icon: icon,
          //   title: place.name,
          //   position: place.geometry.location
          // }));

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }



        });
        map.fitBounds(bounds);
      });

      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // markers.push(new google.maps.Marker({
          //   map: map,
          //   icon: icon,
          //   title: place.name,
          //   position: place.geometry.location
          // }));

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }



        });

        map.fitBounds(bounds);

      });

      var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('pickup').addEventListener('change', onChangeHandler);
      document.getElementById('dropoff').addEventListener('change', onChangeHandler);

    }
    setTimeout(function(){
      initMap();
    }, 2000);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: document.getElementById('pickup').value,
        destination: document.getElementById('dropoff').value,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var price = response.routes[0].legs[0].distance.value / 1000;
          document.getElementById('price').innerHTML = '$' + price.toFixed(0);
          $scope.test = 'test';
        }
      });

    }


  });
