'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderHistoryCtrl
 * @description
 * # FoodOrderHistoryCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderHistoryCtrl', function(FoodOrderHistoryService) {
    return new FoodOrderHistoryController(FoodOrderHistoryService);
  });

function FoodOrderHistoryController(FoodOrderHistoryService) {
  var self = this;

  this.ordersHistory = [];

  this.getAll = function() {
    FoodOrderHistoryService.getAll()
      .then(function successCallback(response) {
        console.log(response);
        self.ordersHistory = response.data;
      });
  }

  this.getAll();

}
