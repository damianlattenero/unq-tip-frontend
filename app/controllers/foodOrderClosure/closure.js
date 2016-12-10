'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ClosureCtrl
 * @description
 * # ClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('ClosureCtrl', function (FoodOrderClosureService) {
    return new ClosureController(FoodOrderClosureService);
  });

function ClosureController(FoodOrderClosureService) {
  var self = this;

  this.clousure = {
    from: 0,
    to: 0
  };

  this.clousures = [];

  $(function () {
    var day = new Date();

    $('#from').datetimepicker({defaultDate: day});
    $('#to').datetimepicker({defaultDate: day, useCurrent: false});

    $("#from").on("dp.change", function (e) {
      $('#to').data("DateTimePicker").minDate(e.date);
      self.clousure.from = new Date(e.date).getTime();
    });

    $("#to").on("dp.change", function (e) {
      $('#from').data("DateTimePicker").maxDate(e.date);
      self.clousure.to = new Date(e.date).getTime();
    });
  });

  this.generateClosure = function () {
    FoodOrderClosureService.generateClosure(self.clousure)
      .then(function successCallback(response) {
        self.clousures = response.data;
      });
  };

  this.showClosure = function () {
    FoodOrderClosureService.showClosure(self.clousure)
      .then(function successCallback(response) {
        self.clousures = response.data;
      });
  };

}
