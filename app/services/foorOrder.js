'use strict';
/**
 * @ngdoc service
 * @name ar.edu.unq.tip.marchionne-lattenero.foorOrder
 * @description
 * # product
 * Service in the ar.edu.unq.tip.marchionne-lattenero.
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
