'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foodOrderHistory
 * @description
 * # foodOrderHistory
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('FoodOrderHistoryService', function ($http, ENV) {
    return {
/*
      get: function (id) {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrdersHistory/' + id
        });
      },
*/
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrdersHistory/all/'
        });
      }
    };
  });
