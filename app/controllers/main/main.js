'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('MainCtrl', function ($scope, NewFoodOrderCtrl, ProductService, $window) {

    var self = this;

    this.getProducts = function () {
      ProductService.getAll()
        .then(function successCallback(response) {
          self.products = response.data;
        });
    }

    this.getProducts();

    this.orderProduct = function (productId) {
      var foodOrder = NewFoodOrderCtrl.newFoodOrder;
      foodOrder.productId = productId;
      foodOrder.orderProduct(foodOrder);
      var product = self.products.filter(function (p) { return p.productId == productId; });
      product[0].pending += 1;
    };

  });
