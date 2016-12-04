'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foodOrder
 * @description
 * # foodOrder
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('FoodOrderService', function ($http, ENV, LoginService) {
    return {
      get: function (id) {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrders/' + id
        });
      },
      order: function (newFoodOrder) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/order/',
          params: {token: LoginService.getToken()},
          data: newFoodOrder
        });
      },
      cancelorder: function (newFoodOrder) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/cancelorder/',
          params: {token: LoginService.getToken()},
          data: newFoodOrder
        });
      },
      cooked: function (newFoodOrder) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/cooked/',
          params: {token: LoginService.getToken()},
          data: newFoodOrder
        });
      },
      cancelcooked: function (newFoodOrder) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/cancelcooked/',
          params: {token: LoginService.getToken()},
          data: newFoodOrder
        });
      },
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrders/all/'
        });
      },
    };
  });
