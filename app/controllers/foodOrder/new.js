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

    $scope.setId=function (id) {
      $scope.newFoodOrder.productId = id;
    }

    $scope.orderProduct= function (foodOrder) {
      foodOrder.productAmount = 1;
      $scope.save(foodOrder);
    };

    $scope.cookProduct= function (foodOrder) {
      foodOrder.productAmount = (-1);
      $scope.save(foodOrder);
    };

    $scope.save = function (foodOrder) {
      FoodOrderService.save(foodOrder).then(function (response) {
          $window.location.reload();
          //$window.location.assign('/#/foodOrder/');
          // $window.location.assign('/#/foodOrder/' + response.data.id);
        },
        function (error) {
          console.log(error);
        });
    };

  });
