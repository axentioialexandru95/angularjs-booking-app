'use strict';

describe('Service: selectOptions', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var selectOptions;
  beforeEach(inject(function (_selectOptions_) {
    selectOptions = _selectOptions_;
  }));

  it('should do something', function () {
    expect(!!selectOptions).toBe(true);
  });

});
