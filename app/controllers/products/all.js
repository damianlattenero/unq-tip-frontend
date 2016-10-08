'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the tipMarchionneLattenero
 */

 //var myApp = angular.module('myApp', []);
//var myApp = angular.module('tipMarchionneLattenero', []);

angular.module('myApp')
  .controller('ProductsCtrl', function($scope, ProductService, $routeParams) {
    $scope.loading = true;
    $scope.products = [];
    ProductService.getAll()
      .then(function successCallback(response) {
        $scope.products = response.data;
      });
  });
