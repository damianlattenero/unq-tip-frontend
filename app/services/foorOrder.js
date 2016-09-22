'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foorOrder
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
          url: ENV.apiEndpoint + 'foorOrder/' + id
        });
      },
      save: function (newFoodOrder) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'foorOrder/create',
          /* params: {
           token: AuthService.getToken()          },*/
          data: newFoodOrder
        });
      },
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foorOrders/all/'
        });
      },
    };
  });
