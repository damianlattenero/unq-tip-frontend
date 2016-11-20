'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.product
 * @description
 * # product
 * Service in the tipMarchionneLattenero.
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
      modifyStock: function (productBody) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'products/modifyStock/',
          /* params: {
           token: AuthService.getToken()          },*/
          data: productBody
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
