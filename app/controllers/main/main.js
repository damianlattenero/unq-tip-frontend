'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('MainCtrl', function ($rootScope, $interval, ProductService, FoodOrderService, CacheService) {

    var self = this;

    this.products = [];

    this.autoRefresh = true;

    this.getProducts = function () {
      ProductService.getAll()
        .then(function successCallback(response) {
          self.products = response.data;
        });
    };

    this.getProducts();

    $interval(function () {
      if ($rootScope.isAuthenticated && self.autoRefresh)
        self.getProducts();
    }, 1000);

    this.newFoodOrder = {
      productId: 0
    };

    /*Acciones sobre pedidos de productos*/

    this.orderProduct = function (product) {
      product.pending += 1;
      self.newFoodOrder.productId = product.id;
      FoodOrderService.order(self.newFoodOrder)
        .then(function successCallback(response) {
          self.updatePending(product.id, response.data.productPending);
        });
    };

    this.cancelOrderProduct = function (product) {
      self.newFoodOrder.productId = product.id;
      product.pending -= 1;
      FoodOrderService.cancelorder(self.newFoodOrder)
        .then(function successCallback(response) {
          self.updatePending(self.newFoodOrder.productId, response.data.productPending);
        });
    };

    this.cookProduct = function (product) {
      self.newFoodOrder.productId = product.id;
      product.pending -= 1;
      FoodOrderService.cooked(self.newFoodOrder)
        .then(function successCallback(response) {
          self.updatePending(self.newFoodOrder.productId, response.data.productPending);
        });
    };

    this.cancelCookProduct = function (product) {
      self.newFoodOrder.productId = product.id;
      product.pending += 1;
      FoodOrderService.cancelcooked(self.newFoodOrder)
        .then(function successCallback(response) {
          self.updatePending(self.newFoodOrder.productId, response.data.productPending);
        });
    };

    this.updatePending = function (productId, pending) {
      var product = self.products.filter(function (product) {
        return product.id === productId
      });
      product[0].pending = pending;
    };

    this.isEnabledCookProduct = function (product) {
      return (product.pending > 0);
    };

    this.isEnabledCancelOrderProduct = function (product) {
      return (product.pending > 0);
    };

    this.front = true;

    this.modifyStock = function (product) {
      var productBody = {
        productId: product.id,
        hasStock: !product.hasStock
      };
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

    this.isEnabledCancelCookProduct = function (product) {
      //return product[0].modifyStock;
      return true;
    };

    this.hasStock = function (product) {
      return product.modifyStock;
    }

    this.isEnabledOrderProduct = function (product) {
      return product.hasStock;
    };

    this.changePlace = function () {
      if (this.isFront()) {
        $rootScope.place = "COCINA"
      } else {
        $rootScope.place = "MOSTRADOR1"
      }

      var userPlace = {
        place: $rootScope.place
      }

      console.log(userPlace.place)

      CacheService.changeUserPlace(userPlace)
        .then(function successCallback(response) {
          console.log(response.data)
        });
    }

    this.isFront = function () {
      return $rootScope.place != "COCINA";
    };

    this.isKitchen = function () {
      return !this.isFront();
    };

  });
