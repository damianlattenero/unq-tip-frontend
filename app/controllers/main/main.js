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

    ProductService.getAll()
      .then(function successCallback(response) {
        $scope.allProducts = response.data;
      });
  });
