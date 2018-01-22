'use strict';

describe('Service: passengerData', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var passengerData;
  beforeEach(inject(function (_passengerData_) {
    passengerData = _passengerData_;
  }));

  it('should do something', function () {
    expect(!!passengerData).toBe(true);
  });

});
