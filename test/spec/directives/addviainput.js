'use strict';

describe('Directive: addViaInput', function () {

  // load the directive's module
  beforeEach(module('angularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-via-input></add-via-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addViaInput directive');
  }));
});
