'use strict';

angular.module('myApp', ['ngRoute'])

/*
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/order', {
      templateUrl: 'order/order.html',
      controller: 'OrderCtrl'
    });
  }])
*/

  .controller('OrderCtrl', function($scope, ProductService) {
    $scope.loading = true;
    $scope.products = {};
    ProductService.getAll().then(function(response) {
        $scope.products = response.data;
      },
      function(error) {
        console.log(error);
      });
  })
;
