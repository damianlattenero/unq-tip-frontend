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

    // $scope.loading = true;

    this.generateClosureData = {
      user: "",
      from: 0,
      to: 0
    };

    this.clousures = [];
    //vm.authService.userProfile.nickname

    this.generateClosure = function (clousure) {
      self.generateClosureData.user = authService.userProfile.nickname;
     /* self.generateClosureData.from = Date.now();
      self.generateClosureData.to = Date.now();*/
      self.generateClosureData.from = clousure.from.milliseconds;
      self.generateClosureData.to = clousure.to.milliseconds;


      console.log("generateClosureData:" + self.generateClosureData);

      FoodOrderClosureService.generateClosure(self.generateClosureData)
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
