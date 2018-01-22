'use strict';

describe('Controller: TestapiCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var TestapiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestapiCtrl = $controller('TestapiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TestapiCtrl.awesomeThings.length).toBe(3);
  });
});
