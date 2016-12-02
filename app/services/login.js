'use strict';

angular.module('myApp')
  .factory('LoginService', function ($http, ENV) {
    return {
      userLogin: function (obj) {
        return $http({
          method: 'post',
          //dataType: 'json',
          url: ENV.apiEndpoint + 'userModels/login', //'oauth/google',
          // params: { token: AuthService.getToken() },
          data: obj
        });
      }
    };
  });
