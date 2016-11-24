'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderClosureCtrl
 * @description
 * # FoodOrderClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderClosureCtrl', function (FoodOrderClosureService) {
    return new FoodOrderClosureController(FoodOrderClosureService);
  });

function FoodOrderClosureController(FoodOrderClosureService) {
  var self = this;

  self.ordersClosure = [];

  this.getAll = function () {
    FoodOrderClosureService.getAll()
      .then(function successCallback(response) {
        self.ordersClosure = response.data;
      });
  };

  this.getAll();

}
