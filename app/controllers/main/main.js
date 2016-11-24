'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('MainCtrl', function ($scope, $interval, ProductService, FoodOrderService, authService) {

    var self = this;

    this.products = [];

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
      productAmount: 0,
      state: ""
    };

    this.modifyStock = function (product) {
      var productBody = {
        productId: product.id,
        hasStock: !product.hasStock
      }
      ProductService.modifyStock(productBody)
        .then(function successCallback(response) {
          self.updateStock(product.id, response.data.hasStock);
        });
    }

    this.updateStock = function (productId, hasStock) {
      var product = self.products.filter(function (product) {
        return product.id === productId
      });
      product[0].hasStock = hasStock;
    };


    this.hasStock = function (product) {
      return product.modifyStock;
    }

    this.isEnabledOrderProduct = function (product) {
      return product.hasStock;
    };

    this.orderProduct = function (product, user) {
      self.save(product, 1, "ORDER", user);
    };

    this.isEnabledCancelOrderProduct = function (product) {
      return (product.pending > 0);
    };

    this.cancelOrderProduct = function (product, user) {
      self.save(product, -1, "CANCELORDER", user);
    };

    this.isEnabledCookProduct = function (product) {
      return (product.pending > 0);
    };

    this.cookProduct = function (product, user) {
      self.save(product, -1, "COOKED", user);
    };

    this.isEnabledCancelCookProduct = function (product) {
      //return product[0].modifyStock;
      return true;
    };

    this.cancelCookProduct = function (product, user) {
      self.save(product, 1, "CANCELCOOKED", user);
    };

    this.save = function (product, type, state, user) {
      self.newFoodOrder.productId = product.id;
      self.newFoodOrder.productAmount = type;
      self.newFoodOrder.state = state;
      self.newFoodOrder.user = user;

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
