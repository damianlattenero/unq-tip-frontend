'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:NotArchivedFoodOrderCtrl
 * @description
 * # NotArchivedFoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('NotArchivedFoodOrderCtrl', function (FoodOrderService) {
    return new NotArchivedFoodOrderController(FoodOrderService);
  });

function NotArchivedFoodOrderController(FoodOrderService) {
  var self = this;

  this.orders = [];

  this.getAllNotArchived = function () {
    FoodOrderService.getAllNotArchived()
      .then(function successCallback(response) {
        self.orders = response.data;
      });
  };

  this.getAllNotArchived();

}
