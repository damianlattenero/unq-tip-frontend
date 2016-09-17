'use strict';

angular.module('myApp', ['ngRoute'])

/*
 .config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/product', {
 templateUrl: 'product/product.html',
 controller: 'OrderCtrl'
 });
 }])
 */

  .controller('ProductCtrl', function ($scope, ProductService) {
    $scope.loading = true;
    $scope.products = {};
    ProductService.getAll().then(function (response) {
        $scope.products = response.data;
      },
      function (error) {
        console.log(error);
      });
  })
;
