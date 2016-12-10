'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foodOrderClosure
 * @description
 * # foodOrderClosure
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('FoodOrderClosureService', function ($http, ENV, LoginService) {
    return {
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrdersClosure/all/'
        });
      },
      showClosure: function (data) {
        return $http({
          method: 'post',
          url: ENV.apiEndpoint + 'foodOrdersClosure/showClosure/',
          data: data
        });
      },
      generateClosure: function (generateClosureData) {
        return $http({
          method: 'post',
          url: ENV.apiEndpoint + 'foodOrdersClosure/generateClosure/',
          data: generateClosureData
        });
      }
    };
  });
