'use strict';

/**
 * @ngdoc service
 * @name angularApp.passengerData
 * @description
 * # passengerData
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('passengerData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var passenger = {
      number: '1',
      vehicle: 'Saloon',
      payment: 'Account',
      email: '',
      name: '',
      prefix:  '40',
      phoneNumber: '+40',
      selectedHour: 12,
      selectedMinute: 30
    };

    return {
      getProperty: function () {
        return passenger;
      },
      setProperty: function (value) {
        passenger = value;
      }
    };

  });
