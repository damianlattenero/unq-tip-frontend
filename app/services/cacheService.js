'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.CacheService
 * @description
 * # foodOrder
 * Service in the tipMarchionneLattenero.
 */
angular.module('myApp')
  .factory('CacheService', function ($http, ENV, LoginService) {
    return {
      getProducts: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'cache/products'
        });
      },
      getPlaces: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'cache/places'
        });
      },
      getUsers: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'cache/users'
        });
      },
      changeUserPlace: function (userPlace) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'cache/changeUserPlace',
          params: {token: LoginService.getToken()},
          data: userPlace
        })
      }
    };
  });
