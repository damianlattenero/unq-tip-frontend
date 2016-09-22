'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

//var myApp = angular.module('myApp', []);
//var myApp = angular.module('tipMarchionneLattenero', []);

angular.module('myApp')
  .controller('FoodOrderCtrl', function($scope, FoodOrderService, $routeParams) {
    $scope.loading = true;
    $scope.orders = [];
    FoodOrderService.getAll().then(function(response) {
        $scope.orders = response.data;
      },
      function(error) {
        console.log(error);
      });
  });
