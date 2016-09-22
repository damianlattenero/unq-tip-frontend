'use strict';

/**
 * @ngdoc function
 * @name ar.edu.unq.tip.marchionne-lattenero.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the ar.edu.unq.tip.marchionne-lattenero
 */

 //var myApp = angular.module('myApp', []);

angular.module('myApp')
  .controller('ProductsCtrl', function($scope, ProductService, $routeParams) {
    $scope.loading = true;
    $scope.products = [];
    ProductService.getAll().then(function(response) {
        $scope.products = response.data;
      },
      function(error) {
        console.log(error);
      });
  });
