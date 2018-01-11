'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.passenger = {
      number: '1',
      vehicle: 'Saloon',
      payment: 'Paypal/Credit'
    };

    $scope.initialPrice = [];


    $scope.changedPayment = function () {
      var price = document.getElementById('price').innerHTML;
      var parsedprice = parseInt(price);
      $scope.changedPrice = $scope.initialPrice.push(parsedprice);
      var addednewprice = parsedprice + 20;
      if ($scope.passenger.payment === 'Cash'){
        document.getElementById('price').innerHTML = addednewprice;
      } else if ($scope.passenger.payment !== 'Cash'){
        document.getElementById('price').innerHTML = $scope.initialPrice[0];
      }
    };

    if($scope.price !== ''){
      $scope.addDriverTips = function () {
        var price = document.getElementById('price').innerHTML;
        var tips = document.getElementById('tips').value;
        var parsedprice = parseInt(price);
        $scope.changedPrice = $scope.initialPrice.push(parsedprice);
        var parsedtips = parseInt(tips);
        var newprice = parsedprice + parsedtips;
        document.getElementById('price').innerHTML = newprice;
        if (tips === 0){
          document.getElementById('price').innerHTML = $scope.initialPrice[0];
        }
      };
    }






    $scope.payments = [
      {
        "name": "Paypal/Credit"
      },
      {
        "name": "Credit/Debit"
      },
      {
        "name": "Cash"
      },
      {
        "name": "Bank Transfer"
      }
    ]

    $scope.passengers =
      [
        {
          number: 1
        },
        {
          number: 2
        },
        {
          number: 3
        },
        {
          number: 4
        },
        {
          number: 5
        },
        {
          number: 6
        },
        {
          number: 7
        },
        {
          number: 8
        }
      ];

    $scope.vehicles =
      [
        {
          "Name": "Saloon"
        },
        {
          "Name": "MPV"
        },
        {
          "Name": "8-Seater"
        }
      ];


    $scope.sLuggage = 2;
    $scope.bLuggage = 2;
    $scope.passengerPlaces = 4;


    $scope.changeCarType = function () {
      if($scope.passenger.number < 5){
        $scope.passenger.vehicle = 'Saloon';
        if ($scope.vehicles.length === 2){
          $scope.vehicles.unshift({"Name": "Saloon"});
        }
      }
      if($scope.passenger.number === 5){
        $scope.passenger.vehicle = 'MPV';
        if ($scope.vehicles.length === 3){
          $scope.vehicles.splice(0,1);
        }
        if ($scope.vehicles.length === 1){
          $scope.vehicles.unshift({"Name": "MPV"});
        }

      }
      if($scope.passenger.number === 8 ){
        $scope.passenger.vehicle = '8-Seater';
        if ($scope.vehicles.length === 2){
          $scope.vehicles.splice(0,1);
        }

      }
    };



    function initMap() {

      // Instantiate a directions service.
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();


      // Instantiate two locations
      var iasi = {lat: 47.156116, lng: 27.5169311};

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


          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }



        });

        map.fitBounds(bounds);

      });

      var onChangeHandler = function() {
        $scope.calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('pickup').addEventListener('change', onChangeHandler);
      document.getElementById('dropoff').addEventListener('change', onChangeHandler);

    }

    $scope.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
      directionsService.route({
        origin: document.getElementById('pickup').value,
        destination: document.getElementById('dropoff').value,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {

          directionsDisplay.setDirections(response);

          var price = response.routes[0].legs[0].distance.value / 1000;
          document.getElementById('price').innerHTML=  ~~price;
          document.getElementById('distance').innerHTML=  ~~price;

        }
      });
    };

    setTimeout(function(){
      initMap();
    }, 1000);
  });
