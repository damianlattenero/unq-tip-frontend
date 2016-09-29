'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('MainCtrl', function ($scope, FoodOrderService, ProductService, $window) {
/*
    $scope.newFoodOrders = [];
*/

    ProductService.getAll().then(function (response) {
      $scope.allProducts = response.data;
    }, function (error) {
      console.log(error);
    });


    $scope.save = function (foodOrder) {
      FoodOrderService.save(foodOrder).then(function (response) {
          $window.location.assign('/#/foodOrders/' + response.data.id);
        },
        function (error) {
          console.log(error);
        });
    };

  });
