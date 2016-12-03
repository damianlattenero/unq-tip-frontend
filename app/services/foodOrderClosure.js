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
      generateClosure: function (generateClosureData) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrdersClosure/generateClosure/',
          params: { token: LoginService.getToken() },
          data: generateClosureData
        });
      }
    };
  });
