'use strict';

/**
 * @ngdoc function
 * @name desappGroupABackendApp.controller:VehicleCtrl
 * @description
 * # VehicleCtrl
 * Controller of the desappGroupABackendApp
 */

 //var myApp = angular.module('myApp', []);
//var myApp = angular.module('desappGroupABackendApp', []);

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
