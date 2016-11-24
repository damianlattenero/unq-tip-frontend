'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ClosureCtrl
 * @description
 * # ClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('ClosureCtrl', function (FoodOrderClosureService, authService) {
    return new ClosureController(FoodOrderClosureService, authService);
  });

function ClosureController(FoodOrderClosureService, authService) {
    var self = this;

    this.clousure = {
      user: "",
      from: 0,
      to: 0
    };

    this.clousures = [];

    $(function () {
        $('#from').datetimepicker();
        $('#to').datetimepicker({ useCurrent: false });

        $("#from").on("dp.change", function (e) {
          $('#to').data("DateTimePicker").minDate(e.date);
          self.clousure.from = e.date;
        });

        $("#to").on("dp.change", function (e) {
          $('#from').data("DateTimePicker").maxDate(e.date);
          self.clousure.to = e.date;
        });
      });

    this.generateClosure = function () {
      console.log("generateClosureDataFrom:" + self.clousure.from);
      console.log("generateClosureDataTo:" + self.clousure.to);

      self.clousure.user = authService.userProfile.nickname;
      self.clousure.from = new Date(self.clousure.from).getTime();
      self.clousure.to = new Date(self.clousure.to).getTime();

      console.log("generateClosureDataFrom:" + self.clousure.from);
      console.log("generateClosureDataTo:" + self.clousure.to);

      FoodOrderClosureService.generateClosure(self.clousure)
        .then(function successCallback(response) {
          self.clousures = response.data;
          console.log("closures:" + response.data);
          // window.location.reload();
          // self.updatePending(foodOrder.productId, response.data.productPending);
        });
    };

}
