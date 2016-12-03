'use strict';

angular.module('myApp')
  .factory('LoginService', function ($http, ENV) {
    return {
      getTokenKey: function () {
        return 'id_token';
      },
      getToken: function () {
        return localStorage.getItem(this.getTokenKey());
      },
      userLogin: function (obj) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'userModels/login',
          // headers: { Authorization: 'Bearer ' + token },
          params: { token: this.getToken() },
          data: obj
        });
      },
      userLogout: function (obj) {
        return $http({
          method: 'post',
          dataType: 'json',
          url: ENV.apiEndpoint + 'userModels/logout',
          params: { token: this.getToken() },
          data: obj
        });
      }
    };
  });
