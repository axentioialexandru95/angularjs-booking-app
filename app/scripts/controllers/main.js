'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $sce, $compile, $http, $rootScope, $location, passengerData, moment) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    passengerData.getProperty();

    $scope.passenger = {
      payment: passengerData.getProperty().payment,
      vehicle: passengerData.getProperty().vehicle,
      prefix: passengerData.getProperty().prefix,
      phoneNumber: passengerData.getProperty().phoneNumber,
      selectedHour: passengerData.getProperty().selectedHour,
      selectedMinute: passengerData.getProperty().selectedMinute,
      number: passengerData.getProperty().number,
      email: passengerData.getProperty().email,
      name: passengerData.getProperty().name,
      dropoffDetails: '',
      pickupDetails: ''
    };

    $scope.timeTest = {
      text: 'Hello World!',
      time: '2017.08.04'
    };

    $scope.initialPrice = [];
    $scope.finalPrice = {
      vehiclePrice: 0,
      paymentMethod: 0,
      driverTips: 0,
      price: 0
    };

    $rootScope.logout = function () {
      localStorage.clear();
      $rootScope.loggedIn = false;
      return $location.path('login');
    };


    var hours = [];

    for(var i=0; i<24; i++)
    {

      hours.push(i);
    }
    $scope.hours = hours;

    var minutes = [];

    for (var i=0; i<=60; i++)
    {

      minutes.push(i);
    }
    $scope.minutes = minutes;

    $scope.changeDate = function () {
      $scope.date = document.getElementById('datepicker').value;
      // Disable weekend selection
      $scope.pickupTime = $scope.date + ' ' + $scope.selectedHour + ':' + $scope.selectedMinute;
      console.dir($scope.pickupTime);
    };

    $scope.tips = 0;
    $scope.addDriverTips = function () {
      $scope.finalPrice.driverTips = parseInt($scope.tips);
      if($scope.tips === null){
        $scope.tips = 0;
        $scope.price = $scope.initialPrice[0];
      }
      $scope.finalPrice.driverTips = parseInt($scope.tips);
      return $scope.finalPrice.driverTips;
    };

    $scope.changeCarType = function () {
      if($scope.passenger.number < 5){

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

    $scope.changePayments = function () {
      if($scope.passenger.payment == 'Cash'){
        $scope.paymentMethod = 5;
      }
      else if($scope.passenger.payment == 'MCB'){
        $scope.paymentMethod = 10;
      }
      else if($scope.passenger.payment == 'World Pay'){
        $scope.paymentMethod = 7;
      }
      else if($scope.passenger.payment == 'PayPal'){
        $scope.paymentMethod = 15;
      }
      else {
        $scope.paymentMethod = 0;
      }
      $scope.finalPrice.paymentMethod = $scope.paymentMethod;
      $scope.calcFinalPrice();
    };

    var i = 1;

    $scope.addTemplate = function () {
      $scope.Via.push(i);
      i++;
    };
    $scope.Via = [];

    $scope.removeTemplate = function (p)
    {
      $scope.Via.splice($scope.Via.indexOf(p),1);
    };

    $scope.showVia = false;

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

    $scope.sendBooking = function () {
      $http({
        method: 'POST',
        url: 'https://api-test.insoftd.com/v1/client/booking',
        // url: 'http://demo9445602.mockable.io/tryingtopost',
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('basic'),
          'Content-Type': 'application/json'
        },
        dataType: 'json',
        data: {
          "BookingList": [{
            "Booking": {
              "id_car_type": "1",
              "id_client": localStorage.getItem('id_name'),
              "order_number": "",
              "id_driver_to_car": null,
              "passenger_name": $scope.passenger.name,
              "passenger_email": $scope.passenger.email,
              "passenger_mobile": $scope.passenger.phoneNumber,
              "payment_method": $scope.passenger.payment,
              "status": "Unallocated",
              "source": "backoffice",
              "infant_seats_number": 0,
              "child_seats_number": 0,
              "booster_seats_number": 0,
              "passengers_number": $scope.passenger.number,
              "pickup_address": $scope.pickup,
              "dropoff_address": $scope.dropoff,
              //"2018-1-25 15:14:0"
              "pickup_time": "2018-1-24 15:14:0",
              //$scope.pickupLat
              //$scope.pickupLong
              "pickup_lat": $scope.lat,
              "pickup_lng": $scope.long,
              "dropoff_lat": $scope.lat2,
              "dropoff_lng": $scope.long2,
              "duration": 1459,
              "journey_distance": $scope.distance + "000",
              "waiting_time": 0,
              "journey_type": "asap",
              "booking_type": 1,
              "cancel_reason": null,
              "id_pickup_zone": "791",
              "id_dropoff_zone": "791",
              "pickup_details": $scope.passenger.pickupDetails,
              "dropoff_details": $scope.passenger.dropoffDetails
            },
            "BookingCharge": {
              "extra_card_payment": 0,
              "base_journey_charge": 17.01,
              "driver_base_journey_charge": 0,
              "extra_baby_seat": 0,
              "extra_stow": 5,
              "duration_charge": 0,
              "extra_waiting_time": 0,
              "extra_car_type": 0,
              "exception": 0,
              "time_frame": 17.01,
              "cash": $scope.finalPrice.price,
              "credit": 0,
              "commission": 0,
              "discount": 0,
              "driver_tip": $scope.tips,
              "total_journey": $scope.finalPrice.price,
              "driver_total_journey": 0,
              "zone_extra_charge": 0,
              "voucher_discount": 0,
              "administration_fee": 5,
              "vat": 22.01,
              "driver_charges_1": 0,
              "driver_charges_2": 0,
              "driver_earnings": 0,
              "override_driver_earnings": 0,
              "company_earnings": 0,
              "pay_to_driver": 0,
              "pay_to_company": 0,
              "company_report_income": 0,
              "company_report_income_vat": 0,
              "company_report_vat": 0,
              "percent_driver_total": 0
            },
            "JourneyWaypoint": [],
            "Payment": {
              "payment_status": "Pending"
            }
          }]
        }
      })
        .then (
          function (response) {
            console.dir(response);
          },
          function (response) {
            console.dir("POST METHOD DIDN'T WORK" + response);
          });
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

      directionsDisplay.setMap(map);

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
          $scope.lat2 = place.geometry.viewport.f.f;
          $scope.long2 = place.geometry.viewport.b.b;

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

          $scope.lat = place.geometry.viewport.f.f;
          $scope.long = place.geometry.viewport.b.b;
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
        $scope.calcFinalPrice();
      };

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

          console.dir(response);
          directionsDisplay.setDirections(response);
          var price = response.routes[0].legs[0].distance.value / 1000;

          $scope.route = response.routes[0];
          $scope.price = parseFloat(price);
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
      $scope.finalPrice.price =  parseInt($scope.initialPrice) + parseInt($scope.finalPrice.vehiclePrice) + parseInt($scope.finalPrice.paymentMethod) + parseInt($scope.finalPrice.driverTips);
      console.dir($scope.finalPrice.price);
    };

    // Get Requests - Car types
    // https://api-test.insoftd.com/v1/client/car_type/
    $http({
      Method: 'GET',
      url: 'https://api-test.insoftd.com/v1/client/car_type/',
      headers: {'Authorization': 'Basic '+ localStorage.getItem('basic')}
    })
      .then(
        function (response) {
          var carTypes = response;
          $scope.carTypes = carTypes.data.records;
        },
        function (response) {
          console.dir("GET METHOD DIDN'T WORK" + response);
        });

    // Get Requests - Payment Methods
    //https://api-test.insoftd.com/v1/operator/config
    $http({
      Method: 'GET',
      url: 'https://api-test.insoftd.com/v1/operator/config',
      headers: {'Authorization': 'Basic '+ localStorage.getItem('basic')}
    })
      .then(
        function (response) {
          var paymentMethods = response;
          $scope.paymentMethods = paymentMethods.data.records;
        },
        function (response) {
          console.dir("GET METHOD DIDN'T WORK" + response);
        });

    // Post Request - make a booking
    //https://api-test.insoftd.com/v1/client/booking



    setTimeout(function(){
      initMap();

    }, 500);

    // Datepicker
    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };




    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data)
    {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }
  });


