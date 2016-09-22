'use strict';
/**
 * @ngdoc service
 * @name ar.edu.unq.tip.marchionne-lattenero.product
 * @description
 * # product
 * Service in the ar.edu.unq.tip.marchionne-lattenero.
 */
angular.module('myApp')
  .factory('ProductService', function ($http, ENV) {
    return {
      get: function (id) {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'products/' + id
        });
      },
      save: function (newProduct) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'products/create',
          /* params: {
           token: AuthService.getToken()          },*/
          data: newProduct
        });
      },
      getAll: function () {
        return $http({
          method: 'get',
          url: ENV.apiEndpoint + 'products/all/'
        });
      },
    };
  });
