'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderClosureCtrl
 * @description
 * # FoodOrderClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderClosureCtrl', function($scope, FoodOrderClosureService, $routeParams) {
    var self = this;

    $scope.loading = true;

    self.ordersClosure = [];
    FoodOrderClosureService.getAll()
      .then(function successCallback(response) {
        self.ordersClosure = response.data;
      });

  });
