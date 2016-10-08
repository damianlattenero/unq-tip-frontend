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
    $scope.newFoodOrder = {
      productId: 0,
      productAmount: 0
    };

    $scope.setId = function (id) {
      $scope.newFoodOrder.productId = id;
    }

    $scope.orderProduct = function (foodOrder) {
      foodOrder.productAmount = 1;
      // $scope.addAnimation(foodOrder,"orderProduct");
      $scope.save(foodOrder);
    };

    $scope.cookProduct = function (foodOrder) {
      foodOrder.productAmount = (-1);
      //$scope.addAnimation(foodOrder,"cookProduct");
      $scope.save(foodOrder);
    };

    $scope.save = function (foodOrder) {
      FoodOrderService.save(foodOrder)
        .then(function successCallback(response) {
            $scope.updatePending(foodOrder.productId, response.data.productPending);
        });
    };
    $scope.updatePending = function (productId, pending) {
      var product = document.getElementById(productId);
      product.getElementsByClassName("productPending")[0].innerHTML = pending;
    };

    $scope.addAnimation = function (foodOrder, buttonClass) {
      var product = document.getElementById(foodOrder.productId);
      var button = product.getElementsByClassName("FoodOrderActions")[0].getElementsByClassName(buttonClass)[0];
      button.addClass('animated bounceOutLeft');
    };
  });
