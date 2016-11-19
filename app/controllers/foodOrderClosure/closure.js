'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ClosureCtrl
 * @description
 * # ClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('ClosureCtrl', function ($scope, FoodOrderClosureService, authService, $routeParams) {
    var self = this;

    $scope.loading = true;

    $scope.clousure = {
      user: "",
      from: 0,
      to: 0
    };

    $(function () {
        $('#from').datetimepicker();
        $('#to').datetimepicker({
          useCurrent: false //Important! See issue #1075
        });
        $("#from").on("dp.change", function (e) {
          $('#to').data("DateTimePicker").minDate(e.date);
        });
        $("#to").on("dp.change", function (e) {
          $('#from').data("DateTimePicker").maxDate(e.date);
        });
        $("#from").on("dp.change", function(e) {

        $scope.clousure.from = e.date;

        });
        $("#to").on("dp.change", function(e) {

        $scope.clousure.to = e.date;

        });
      });

    this.clousures = [];
    //vm.authService.userProfile.nickname

    this.generateClosure = function () {
      $scope.clousure.user = authService.userProfile.nickname;
      $scope.clousure.from= new Date($scope.clousure.from).getTime();
      $scope.clousure.to = new Date($scope.clousure.to).getTime();

      console.log("generateClosureDataFrom:" + $scope.clousure.from);
      console.log("generateClosureDataTo:" + $scope.clousure.to);

      FoodOrderClosureService.generateClosure($scope.clousure)
        .then(function successCallback(response) {
          self.clousures = response.data;
          console.log("closures:" + response.data);
          // window.location.reload();
          // self.updatePending(foodOrder.productId, response.data.productPending);
        });
    };

    this.generateClosureToday = function () {
      FoodOrderClosureService.generateClosureToday(authService.userProfile.nickname)
        .then(function successCallback(response) {
          window.location.reload();
          // self.updatePending(foodOrder.productId, response.data.productPending);
        });
    };

  });
