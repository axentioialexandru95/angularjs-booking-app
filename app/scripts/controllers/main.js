'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $sce, $compile, $http) {
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
    $scope.finalPrice = {
      vehiclePrice: 0,
      paymentMethod: 0,
      driverTips: 0,
      price: 0,
    };

    $scope.changedPayment = function () {
      if($scope.price === undefined){
        $scope.price = 0;
      }
      if ($scope.passenger.payment === 'Paypal/Credit'){
        $scope.paymentMethod = 0;
      }
      if ($scope.passenger.payment === 'Cash'){
        $scope.paymentMethod = 20;
      }
      if ($scope.passenger.payment === 'Credit/Debit'){
        $scope.paymentMethod = 10;
      }
      if ($scope.passenger.payment === 'Bank Transfer'){
        $scope.paymentMethod = 30;
      }
      $scope.finalPrice.paymentMethod = $scope.paymentMethod;
      return $scope.finalPrice.paymentMethod;
    };
    // $scope.finalPrice.push($scope.paymentMethod);


    $scope.tips = document.getElementById('tips').value;
    $scope.price = 0;
    $scope.addDriverTips = function () {
      $scope.finalPrice.driverTips = parseInt($scope.tips);
      if($scope.tips === null){
        $scope.price = $scope.initialPrice[0];
      }
      console.dir($scope.finalPrice);
      return $scope.finalPrice.driverTips;
    };

    // $scope.isNull = function () {
    //   if ($scope.tips = '') {
    //     $scope.tips = 0;
    //     return $scope.tips;
    //   }
    // };


    $scope.changeCarType = function () {
      if($scope.passenger.number < 5){

        if ($scope.vehicles.length == 2){
          $scope.vehicles.unshift({"Name": "Saloon"});
        }
        if($scope.vehicles.length == 1){
          $scope.vehicles.unshift({"Name": "MPV"});
          $scope.vehicles.unshift({"Name": "Saloon"});
        }
      }
      if($scope.passenger.number == 5 || $scope.passenger.number > 5){
        $scope.passenger.vehicle = "MPV";

        if ($scope.vehicles.length == 3){
          $scope.vehicles.splice(0,1);
        }
        if ($scope.vehicles.length == 1){
          $scope.vehicles.unshift({"Name": "MPV"});
        }

      }
      if($scope.passenger.number == 8 ){
        $scope.passenger.vehicle = "8-Seater";
        if ($scope.vehicles.length == 2){
          $scope.vehicles.splice(0,1);
        }
      }


    };

    $scope.changeVehiclePrice = function () {
      if($scope.passenger.vehicle == 'Saloon' || $scope.passenger.number < 5){
        $scope.vehiclePrice = 0;
      }
      if($scope.passenger.vehicle == 'MPV' || ($scope.passenger.number >= 5 && $scope.passenger.number < 8)){
        $scope.vehiclePrice = 5;
      }
      if($scope.passenger.vehicle == '8-Seater' || $scope.passenger.number == 8){
        $scope.vehiclePrice = 10;
      }
      $scope.finalPrice.vehiclePrice = $scope.vehiclePrice;
      return $scope.finalPrice.vehiclePrice;
    };

    var i = 1;
    $scope.addTemplate = function () {
      // var placedVia = angular.element(document.querySelector('#viaInputPlace'));
      // var appendVia = $compile('<add-via-input></add-via-input>')($scope);
      // placedVia.append(appendVia);
      $scope.Via.push(i);
      i++;
    };
    $scope.Via = [];

    $scope.removeTemplate = function (p)
    {
      $scope.Via.splice($scope.Via.indexOf(p),1);
      console.dir(p);
      // var placedVia = angular.element(document.querySelector('#viaInputPlace'));
      // placedVia.children().remove();
    };

    $scope.showVia = false;
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
    ];
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

    // TODO make the luggage implementation via vehicle changes
    // $scope.changeLuggage = function () {
    //   if($scope.passenger.vehicle == 'Saloon'){
    //     $scope.sLuggage = 2;
    //     $scope.bLuggage = 2;
    //     $scope.passengerPlaces= 2;
    //   };
    //   if($scope.passenger.vehicle == 'MPV'){
    //     $scope.sLuggage = 5;
    //     $scope.bLuggage = 4;
    //     $scope.passengerPlaces= 5;
    //   };
    //   if($scope.passenger.vehicle == '8-Seater'){
    //     $scope.sLuggage = 8;
    //     $scope.bLuggage = 8;
    //     $scope.passengerPlaces= 8;
    //   };
    // }







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
        $scope.onChangeHandler();
      });

      $scope.onChangeHandler = function() {
        $scope.calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('pickup').addEventListener('change', $scope.onChangeHandler);
      document.getElementById('dropoff').addEventListener('change', $scope.onChangeHandler);
    }

    $scope.waypts = [47.1565195, 27.6120205];

    $scope.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
      var first = new google.maps.LatLng(47.094394, 25.963092);
      directionsService.route({
        origin: $scope.pickup,
        destination: $scope.dropoff,
        // waypoints: [{location: first, stopover: true}],
        // optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {

          directionsDisplay.setDirections(response);
          $scope.route = response.routes[0];
          var price = response.routes[0].legs[0].distance.value / 1000;
          $scope.price = ~~price;
          $scope.distance = ~~price;
          $scope.initialPrice.push($scope.price);
          if ($scope.price !== $scope.initialPrice[0]){
            $scope.initialPrice.unshift($scope.price);
          }
        }
      });
      $scope.switchPlaces = function () {
        var pickup = document.getElementById('pickup').value;
        $scope.pickup = pickup;
        var dropoff = document.getElementById('dropoff').value;
        $scope.dropoff = dropoff;
        var tmp = $scope.pickup;

        $scope.pickup = $scope.dropoff;
        $scope.dropoff = tmp;
        $scope.onChangeHandler();
      };
    };

    $scope.calcFinalPrice = function () {
      $scope.finalPrice.price =  parseInt($scope.finalPrice.vehiclePrice) + parseInt($scope.finalPrice.paymentMethod) + parseInt($scope.finalPrice.driverTips);
      $scope.onChangeHandler();
    };


    // Get Requests
    // https://api-test.insoftd.com/v1/client/car_type/
    // $http.get('https://api-test.insoftd.com/v1/client/car_type/')
    //   .then(
    //     function (response) {
    //       var carTypes = response;
    //       $scope.carTypes = carTypes.data;
    //       $scope.carsTypes = carTypes.data[0].records;
    //       console.dir($scope.carsTypes);
    //     },
    //     function (response) {
    //       console.dir("GET METHOD DIDN'T WORK" + response);
    //     });

    setTimeout(function(){
      initMap();
    }, 800);
  });


