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
      }
    };
  });
