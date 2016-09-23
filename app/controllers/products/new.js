'use strict';
/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ProducCtrl
 * @description
 * # ProductCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
    .controller('NewProductsCtrl', function($scope, ProductService, $window) {
    $scope.newProduct = {
      productName: "",
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
