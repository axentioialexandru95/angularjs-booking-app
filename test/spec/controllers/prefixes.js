'use strict';

describe('Controller: PrefixesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var PrefixesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrefixesCtrl = $controller('PrefixesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PrefixesCtrl.awesomeThings.length).toBe(3);
  });
});
