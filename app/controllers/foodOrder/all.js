'use strict';

/**
 * @ngdoc function
 * @name ar.edu.unq.tip.marchionne-lattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the ar.edu.unq.tip.marchionne-lattenero
 */

//var myApp = angular.module('myApp', []);

angular.module('myApp')
  .controller('FoodOrderCtrl', function($scope, FoodOrderCtrlService, $routeParams) {
    $scope.loading = true;
    $scope.orders = [];
    FoodOrderCtrlService.getAll().then(function(response) {
        $scope.orders = response.data;
      },
      function(error) {
        console.log(error);
      });
  });
