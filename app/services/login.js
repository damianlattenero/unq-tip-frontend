'use strict';

angular.module('myApp')
  .factory('LoginService', function ($http, ENV) {
    return {
      userLogin: function (obj) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'userModels/login',
          // params: { token: AuthService.getToken() },
          data: obj
        });
      },
      userLogout: function (obj) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'userModels/logout',
          // params: { token: AuthService.getToken() },
          data: obj
        });
      }
    };
  });
