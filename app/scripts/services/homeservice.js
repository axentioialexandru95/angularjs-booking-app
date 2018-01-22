'use strict';

/**
 * @ngdoc service
 * @name angularApp.homeService
 * @description
 * # homeService
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('homeService', function ($http) {
    // Service logic
    // ...

    var loadConfig = function(successCallback)
    {
      return $http({
        method: 'GET',
        url: 'https://api-test.insoftd.com/v1/operator/config'
      }).then(
        successCallback,
        function (response)
        {
          console.log('Error config');
        });
    };


    var loadclient = function(successCallback)
    {



      return $http({
        method: 'GET',
        url: 'https://api-test.insoftd.com/v1/client/client/'+ localStorage.getItem('id_name')
      }).then(
        successCallback,
        function (response)
        {
          console.log('Error config');
        });
    };


    var car_tip=function(succesCallback)
    {
      return $http({
        method: 'GET',
        url: 'https://api-test.insoftd.com/v1/client/car_type/'
      }).then(
        succesCallback,
        function(resp)
        {

          console.log("Error car_type");
        });


    };



    var makeArrayL = function(p_length)
    {
      var j;
      var arr = [];
      for (j = 0; j < p_length; j++)
        arr[j] = j > 9 ? j : '0' + j;
      return arr;
    };

    var prepareData = function (bookingData, temp,details,adress)
    {

      return {
        //"BookingList": [{
        "Booking": {
          "id_car_type": temp.vehicle,
          "id_client":localStorage.getItem('id_name'),
          "order_number": "",
          "id_driver_to_car": null,
          "passenger_name": bookingData.register. passenger_name,
          "passenger_email": bookingData.register.passenger_email ,
          "passenger_mobile": bookingData.register.passenger_mobile,
          "payment_method": bookingData.register.peiment,
          "status": "Unallocated",
          "source": "backoffice",
          "observations":bookingData.register.observations,
          "infant_seats_number": temp.infant,
          "child_seats_number": temp.child,
          "booster_seats_number": temp.cbooster,
          "passengers_number": temp.seats_number,
          "pickup_address":bookingData.register.pickup_address.description ,
          "dropoff_address": bookingData.register.dropoff_address.description,
          "pickup_time":moment(temp.timp).format('YYYY-MM-DD HH:mm:ss'),
          "pickup_lat": adress.pickUp.lat,
          "pickup_lng": adress.pickUp.lng,
          "dropoff_lat": adress.dropOff.lat,
          "dropoff_lng": adress.dropOff.lng,
          "duration": details.boking.duration,
          "journey_distance": details.boking.distance,
          "hand_luggage":temp.hand_luggage ,
          "checkin_luggage":temp.checkin_luggage ,
          "waiting_time": 0,
          "journey_type": "asap",
          "booking_type": 1,
          "cancel_reason": null,
          "id_pickup_zone": "791",
          "id_dropoff_zone": "791",
          "pickup_details": bookingData.register.pickupdetails,
          "dropoff_details": bookingData.register.dropoff_details,
          "airline_name":temp.airlane ,
          "flight_type": "departure",
          "landing_flight_number":temp.landing_flight_number ,
          "departure_city":temp.departure_city ,
          "pickup_duration_delay":temp.pickup_duration_delay,
          "landing_flight_time":moment(temp.landing_flight_time).format('YYYY-MM-DD HH:mm:ss'),
          "display_name":temp.display_name

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
          "cash": bookingData.totalprice,
          "credit": 0,
          "commission": 0,
          "discount": 0,
          "driver_tip": 0,
          "total_journey": bookingData.totalprice,
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
        "JourneyWaypoint": adress.puncte
        ,
        "Payment": {
          "payment_status": "Pending"

        }


      };

    };




    var prepareData1 = function (bookingData, temp,details,adress)
    {
      return {
        //  "BookingList": [{
        "Booking": {
          "id_car_type": temp.vehicle,
          "id_client":localStorage.getItem('id_name'),
          "order_number": "",
          "id_driver_to_car": null,
          "passenger_name": bookingData.register. passenger_name,
          "passenger_email": bookingData.register.passenger_email ,
          "passenger_mobile": bookingData.register.passenger_mobile,
          "payment_method": bookingData.register.peiment,
          "status": "Unallocated",
          "source": "backoffice",
          "observations":bookingData.register.observations,
          "infant_seats_number": temp.infant,
          "child_seats_number": temp.child,
          "booster_seats_number": temp.cbooster,
          "passengers_number": temp.seats_number,
          "pickup_address":bookingData.register.dropoff_address.description,
          "dropoff_address": bookingData.register.pickup_address.description ,
          "pickup_time":moment(temp.temp1_timp).format('YYYY-MM-DD HH:mm:ss'),
          "pickup_lat": adress.dropOff.lat,
          "pickup_lng": adress.dropOff.lng,
          "dropoff_lat": adress.pickUp.lat,
          "dropoff_lng": adress.pickUp.lng,
          "duration": details.boking.duration,
          "journey_distance": details.boking.distance,
          "hand_luggage":temp.hand_luggage ,
          "checkin_luggage":temp.checkin_luggage ,
          "waiting_time": 0,
          "journey_type": "asap",
          "booking_type": 1,
          "cancel_reason": null,
          "id_pickup_zone": "791",
          "id_dropoff_zone": "791",
          "pickup_details": bookingData.register.pickupdetails,
          "dropoff_details": bookingData.register.dropoff_details,
          "airline_name":temp.airlane ,
          "flight_type": "departure",
          "landing_flight_number":temp.landing_flight_number ,
          "departure_city":temp.departure_city ,
          "pickup_duration_delay":temp.pickup_duration_delay,
          "landing_flight_time": moment(temp.landing_flight_time).format('YYYY-MM-DD HH:mm:ss'),
          "display_name":temp.display_name
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
          "cash": bookingData.totalprice,
          "credit": 0,
          "commission": 0,
          "discount": 0,
          "driver_tip": 0,
          "total_journey": bookingData.totalprice,
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
        "JourneyWaypoint":adress.puncte
        ,
        "Payment": {
          "payment_status": "Pending"
        }

      };
    };


    var dataaa={};
    var BookingList=[];
    var confirmBooking = function(bookingData, temp,details,adress, successCallback)
    {

      var sData = prepareData(bookingData, temp,details,adress);
      var sData1 = prepareData1(bookingData, temp,details,adress);



      if(temp.ore != null && temp.minute!=null){


        if(bookingData.register.returnBok==true){

          console.dir(temp.temp1_minute);
          dataaa={
            BookingList:[sData,sData1]
          };
        }else{

          dataaa={
            BookingList:[sData]
          };
        }





        $http({

          url:"https://api-test.insoftd.com/v1/client/booking",
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          data: dataaa

        }).then(successCallback, function(error)
        {
          console.dir(error);
        });
      }
      else{
        alert("Nu ai setat ora si minutele!");
      }
    };

    var tempObj = {
      timp: new Date()
      ,temp1_timp: new Date()
      ,landing_flight_time:new Date()
      , ore:null
      , minute:null
      , seats_number: 1
      , checkin_luggage: 0
      , hand_luggage: 0
      ,vehicle:0
      ,infant:null
      ,child:null
      ,cbooster:null
      ,temp1_ore:null
      ,ore_air: null
      ,minute_air: null
      ,temp1_minute:null
      ,returnBook:null
      ,waypts:[]
      ,airlane:null,
      landing_flight_number:null,
      departure_city:null,
      display_name:null,
      pickup_duration_delay:0


    };


    return {
      loadConfig: loadConfig,
      loadclient: loadclient,
      car_tip:car_tip,
      makeArrayL: makeArrayL,
      tempObj: tempObj,
      confirmBooking: confirmBooking


    };
  });
