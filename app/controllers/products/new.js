'use strict';
/**
 * @ngdoc function
 * @name desappGroupABackendApp.controller:ProducCtrl
 * @description
 * # ProductCtrl
 * Controller of the desappGroupABackendApp
 */

angular.module('myApp')
    .controller('NewProductsCtrl', function($scope, ProductService, $window) {
    $scope.newProduct = {
      name: "",
      description: ""
    };
    $scope.save = function(product) {
      ProductService.save(product).then(function(response) {
          $window.location.assign('/#/products/' + response.data.id);
        },
        function(error) {
          console.log(error);
        });
    };

  });
