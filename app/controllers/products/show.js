'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:VehicleCtrl
 * @description
 * # VehicleCtrl
 * Controller of the tipMarchionneLattenero
 */

//var myApp = angular.module('tipMarchionneLattenero', []);

angular.module('myApp')
  .controller('ShowProductCtrl', function($scope, ProductService, $routeParams) {
    $scope.loading = true;
    $scope.product = {};
    ProductService.get($routeParams.id).then(function(response) {
        $scope.product = response.data;
      },
      function(error) {
        console.log(error);
      });
  });
