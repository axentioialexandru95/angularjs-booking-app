'use strict';

describe('Directive: viainput', function () {

  // load the directive's module
  beforeEach(module('angularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<viainput></viainput>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the viainput directive');
  }));
});
