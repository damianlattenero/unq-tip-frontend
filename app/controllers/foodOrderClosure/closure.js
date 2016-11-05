'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:ClosureCtrl
 * @description
 * # ClosureCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('ClosureCtrl', function($scope, FoodOrderClosureService, authService, $routeParams) {
    var self = this;

    $scope.loading = true;

    this.generateClosureData = {
      momentClosure: 0,
      user: ""
    };

    //vm.authService.userProfile.nickname

    this.generateClosure = function (momentClosure) {
      self.generateClosureData.momentClosure = momentClosure;
      self.generateClosureData.user = authService.userProfile.nickname;

      FoodOrderClosureService.generateClosure(self.generateClosureData)
        .then(function successCallback(response) {
          // self.updatePending(foodOrder.productId, response.data.productPending);
        });
    };

  });
