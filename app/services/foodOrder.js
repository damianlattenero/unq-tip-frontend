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
          url: ENV.apiEndpoint + 'foodOrders/order/',
          data: newFoodOrder
        });
      },
      cancelorder: function (newFoodOrder) {
        return $http({
          method: 'post',
          url: ENV.apiEndpoint + 'foodOrders/cancelorder/',
          data: newFoodOrder
        });
      },
      cooked: function (newFoodOrder) {
        return $http({
          method: 'post',
          url: ENV.apiEndpoint + 'foodOrders/cooked/',
          data: newFoodOrder
        });
      },
      cancelcooked: function (newFoodOrder) {
        return $http({
          method: 'post',
          url: ENV.apiEndpoint + 'foodOrders/cancelcooked/',
          data: newFoodOrder
        });
      },
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrders/all/'
        });
      },
      getAllNotArchived: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrders/allNotArchived/'
        });
      }
    };
  });
