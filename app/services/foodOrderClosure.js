'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.foodOrderClosure
 * @description
 * # foodOrderClosure
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('FoodOrderClosureService', function ($http, ENV) {
    return {
      /*
       get: function (id) {
       return $http({
       method: 'get',
       url: ENV.apiEndpoint + 'foodOrdersClosure/' + id
       });
       },
       */
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'foodOrdersClosure/all/'
        });
      },
      generateClosure: function (generateClosureData) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrdersClosure/generateClosure/',
          /* params: {
           token: AuthService.getToken()          },*/
          data: generateClosureData
        });
      },
      generateClosureToday: function (user) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'foodOrdersClosure/generateClosureToday/',
          /* params: {
           token: AuthService.getToken()          },*/
          data: user
        });
      }
    };
  });
