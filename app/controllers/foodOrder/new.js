'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('NewFoodOrderCtrl', function ($scope, FoodOrderService, $window) {
      this.newFoodOrder = {
        productId: 0,
        productAmount: 0
      };

      this.orderProduct = function (foodOrder) {
        foodOrder.productAmount = 1;
        this.save(foodOrder);
      };

      this.cookProduct = function (foodOrder) {
        foodOrder.productAmount = (-1);
        this.save(foodOrder);
      };

      this.save = function (foodOrder) {
        FoodOrderService.save(foodOrder)
          .then(function successCallback(response) {
            this.updatePending(foodOrder.productId, response.data.productPending);
          });
      };

      this.updatePending = function (productId, pending) {
        var product = document.getElementById(productId);
        product.getElementsByClassName("productPending")[0].innerHTML = pending;
      };

    }
  );
