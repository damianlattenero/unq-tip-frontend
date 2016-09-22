'use strict';
/**
 * @ngdoc function
 * @name ar.edu.unq.tip.marchionne-lattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the ar.edu.unq.tip.marchionne-lattenero
 */

angular.module('myApp')
    .controller('NewFoodOrderCtrl', function($scope, FoodOrderService, $window) {
    $scope.newFoodOrder = {
      idProduct: 0,
      amount: 0
    };
    $scope.save = function(foodOrder) {
      foodOrder.idProduct = ProductsCtrl.id;
      foodOrder.amount =

      FoodOrderService.save(foodOrder).then(function(response) {
          $window.location.assign('/#/foodOrder/' + response.data.id);
        },
        function(error) {
          console.log(error);
        });
    };

  });
