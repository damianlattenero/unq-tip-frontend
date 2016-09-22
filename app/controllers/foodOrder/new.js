'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
    .controller('NewFoodOrderCtrl', function($scope, FoodOrderService, $window) {
    $scope.newFoodOrder = {
      idProduct: 0,
      amount: 0
    };
    $scope.save = function(foodOrder) {
      foodOrder.idProduct = 1;
      foodOrder.amount = 1;
/*
      foodOrder.amount =
*/

      FoodOrderService.save(foodOrder).then(function(response) {
          $window.location.assign('/#/foodOrder/' + response.data.id);
        },
        function(error) {
          console.log(error);
        });
    };

  });
