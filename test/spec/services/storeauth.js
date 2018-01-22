'use strict';

describe('Service: storeAuth', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var storeAuth;
  beforeEach(inject(function (_storeAuth_) {
    storeAuth = _storeAuth_;
  }));

  it('should do something', function () {
    expect(!!storeAuth).toBe(true);
  });

});
