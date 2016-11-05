'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderHistoryCtrl
 * @description
 * # FoodOrderHistoryCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderHistoryCtrl', function($scope, FoodOrderHistoryService, $routeParams) {
    var self = this;

    $scope.loading = true;

    self.ordersHistory = [];
    FoodOrderHistoryService.getAll()
      .then(function successCallback(response) {
        self.ordersHistory = response.data;
      });

  });
