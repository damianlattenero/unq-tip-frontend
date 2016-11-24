'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderCtrl', function (FoodOrderService) {
    return new FoodOrderController(FoodOrderService);
  });

function FoodOrderController(FoodOrderService) {
  var self = this;

  this.orders = [];

  this.getAll = function () {
    FoodOrderService.getAll()
      .then(function successCallback(response) {
        self.orders = response.data;
      });
  };

  this.getAll();

}

