'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $sce) {
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
      console.dir($scope.initialPrice[0]);
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
      $scope.price = $scope.paymentMethod + $scope.initialPrice[0];
    };

    //TODO Make the driver tip work when clicking outside of it
    $scope.tips = document.getElementById('tips').value;

    $scope.addDriverTips = function (e) {
      if (e.target != document.getElementById('tips')){
        console.dir($scope.tips);
      }
    };

    $scope.addDriverTips($scope.tips);

    if ($scope.tips !== '')
    {
      console.dir('hello there');
    };




    // TODO - make a directive with the following code and make it add on click
    $scope.viaTemplate = $sce.trustAsHtml('<br>\n' +
      '      <div class="row">\n' +
      '        <div class="input-group">\n' +
      '          <div class="input-group-addon">\n' +
      '            <span class="fa fa-bullseye"></span>\n' +
      '          </div>\n' +
      '          <input type="text" id="viaInput" class="form-control" placeholder="Stop on the way" ng-required="true" required ng-model="viaAddress" name="viaAddress" style="width: calc(100% + 1px)">\n' +
      '          <div class="input-group-addon" style="background-color: #0e90d2; color: white; cursor: pointer">\n' +
      '            <span class="glyphicon glyphicon-remove"></span>\n' +
      '          </div>\n' +
      '          <div class="input-group-addon" ng-click="removeTemplate();" style="cursor: pointer;">\n' +
      '            <span class="glyphicon glyphicon-trash"></span>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <textarea style="margin-top: 5px" name="" id="" cols="30" rows="1" class="form-control" placeholder="Details (e.g. House/Flat no, Building name, etc)"></textarea>\n' +
      '      </div>');

    var compile = document.createElement("compile")
    $scope.addTemplate = function () {
      document.getElementById('addedVia').innerHTML = $scope.viaTemplate;
    };

    $scope.removeTemplate = function () {
      document.getElementById('addedVia').innerHTML = '';
    };
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

    // TODO fix the code, it doesn't function properly on the select tag
    $scope.changeCarType = function () {
      if($scope.passenger.number < 5){
        $scope.passenger.vehicle = 'Saloon';
        if ($scope.vehicles.length == 2){
          $scope.vehicles.unshift({"Name": "Saloon"});
        }
        if($scope.vehicles.length == 1){
          $scope.vehicles.unshift({"Name": "MPV"});
          $scope.vehicles.unshift({"Name": "Saloon"});
        }
      }
      if($scope.passenger.number == 5 || $scope.passenger.number > 5){
        $scope.passenger.vehicle = 'MPV';
        $scope.price = $scope.initialPrice[0] + 10;
        if ($scope.vehicles.length == 3){
          $scope.vehicles.splice(0,1);
        }
        if ($scope.vehicles.length == 1){
          $scope.vehicles.unshift({"Name": "MPV"});
        }

      }
      if($scope.passenger.number == 8 ){
        $scope.passenger.vehicle = '8-Seater';
        $scope.price = $scope.initialPrice[0] + 20;
        if ($scope.vehicles.length == 2){
          $scope.vehicles.splice(0,1);
        }

      }
    };

    // TODO add via for directions on every via instance

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
          $scope.price = ~~price;
          $scope.distance = ~~price;
          $scope.initialPrice.push($scope.price);
          if ($scope.price !== $scope.initialPrice[0]){
            $scope.initialPrice.unshift($scope.price);
          }
        }
        });
    };


    setTimeout(function(){
      initMap();
    }, 1000);


  });

