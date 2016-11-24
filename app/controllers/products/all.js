'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('ProductsCtrl', function (ProductService) {
    return new productsController(ProductService);
  });

function productsController(ProductService) {
  var self = this;

  this.products = [];

  this.getAll = function () {
    ProductService.getAll()
      .then(function successCallback(response) {
        self.products = response.data;
      });
  };

  this.getAll();

}
