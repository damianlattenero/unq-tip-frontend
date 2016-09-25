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
    $scope.save = function (foodOrder) {
      FoodOrderService.save(foodOrder).then(function (response) {
          $window.location.assign('/#/foodOrders/' + response.data.id);
        },
        function (error) {
          console.log(error);
        });
    };

  });
