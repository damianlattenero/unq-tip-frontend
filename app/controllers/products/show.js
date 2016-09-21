'use strict';

/**
 * @ngdoc function
 * @name desappGroupABackendApp.controller:VehicleCtrl
 * @description
 * # VehicleCtrl
 * Controller of the desappGroupABackendApp
 */

//var myApp = angular.module('desappGroupABackendApp', []);

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
