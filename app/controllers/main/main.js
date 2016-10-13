'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $interval, ProductService, FoodOrderService) {

    var self = this;

    this.getProducts = function () {
      ProductService.getAll()
        .then(function successCallback(response) {
          self.products = response.data;
        });
    }

    this.getProducts();

    $interval(function () {
      self.getProducts();
    }, 1000);

    this.newFoodOrder = {
      productId: 0,
      productAmount: 0
    };

    this.orderProduct = function (product) {
      self.save(product, 1);
    };

    this.cancelOrderProduct = function (product) {
      self.save(product, -1);
    };

    this.cookProduct = function (product) {
      self.save(product, -1);
    };

    this.cancelCookProduct = function (product) {
      self.save(product, 1);
    };

    this.save = function (product, type) {
      self.newFoodOrder.productId = product.id;
      self.newFoodOrder.productAmount = type;

      product.pending += self.newFoodOrder.productAmount;

      self.saveFoodOrder(self.newFoodOrder);
    };

    this.saveFoodOrder = function (foodOrder) {
      FoodOrderService.save(foodOrder)
        .then(function successCallback(response) {
          self.updatePending(foodOrder.productId, response.data.productPending);
        });
    };

    this.updatePending = function (productId, pending) {
      var product = self.products.filter(function (product) {
        return product.id === productId
      });
      product[0].pending = pending;
    };

    this.front = true;

    this.isFront = function () {
      return self.front;
    };

    this.isKitchen = function () {
      return !self.front;
    };

  });
