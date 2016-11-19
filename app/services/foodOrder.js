'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foodOrder
 * @description
 * # foodOrder
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('FoodOrderService', function ($http, ENV) {
    return {
      get: function (id) {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrders/' + id
        });
      },
      save: function (newFoodOrder) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/create/',
          /* params: {
           token: AuthService.getToken()          },*/
          data: newFoodOrder
        });
      },
      hasStock: function (productBody) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrders/create/',
          /* params: {
           token: AuthService.getToken()          },*/
          data: productBody
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
