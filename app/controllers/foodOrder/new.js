'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
    .controller('NewFoodOrderCtrl', function($scope, FoodOrderService, ProductService, $window) {
    $scope.newFoodOrder = {
      productId: 1,
      productAmount: 1
    };
    $scope.save = function(foodOrder) {
      FoodOrderService.save(foodOrder).then(function(response) {
          $window.location.assign('/#/foodOrders/' + response.data.id);
        },
        function(error) {
          console.log(error);
        });
    };

  });
