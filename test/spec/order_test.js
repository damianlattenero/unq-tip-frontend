'use strict';

describe('myApp module', function() {

  beforeEach(module('myApp'));

  describe('product controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var productController = $controller('ProductCtrl');
      expect(productController).toBeDefined();
    }));

  });
});
