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
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrdersHistory/all/'
        });
      }
    };
  });
