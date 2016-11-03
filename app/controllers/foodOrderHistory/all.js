'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

//var myApp = angular.module('myApp', []);
//var myApp = angular.module('tipMarchionneLattenero', []);

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
