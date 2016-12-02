'use strict';

(function () {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', 'authService', 'LoginService', 'authManager'];

  function LoginController($rootScope, authService, LoginService, authManager) {

    var self = this;
    self.authService = authService;

    this.userName = "";

    this.setUserName = function (data) {
      self.userName = data;
      $rootScope.userName = data;
    };

    this.login = function () {
      self.authService.login();
    };

    this.logout = function () {
      self.authService.logout();
    };

    $rootScope.$on("userProfileClear", function (event, obj) {

      var authCode = {
        token: localStorage.getItem('id_token'),
        userId: self.authService.userProfile.user_id
      };

      console.log(JSON.stringify(authCode));
      if ($rootScope.isAuthenticated) {
        authManager.unauthenticate();
        LoginService.userLogout(authCode)
          .then(function (response) {
              console.log("Back.userLogout.Response: " + JSON.stringify(response.data));

              if (response.data.authenticated) {
                localStorage.removeItem('userDB');
                self.authService.userProfile = {};
                self.setUserName("");
              }
            },
            function (error) {
              console.log(error);
            });
      }
    });

    $rootScope.$on("userProfileSet", function (event, obj) {
      self.authService.userProfile = obj;
      self.userName = obj.nickname;

      var authCode = {
        token: localStorage.getItem('id_token'),
        userId: self.authService.userProfile.user_id
      };

      console.log(JSON.stringify(authCode));

      if (!$rootScope.isAuthenticated) {
        authManager.authenticate();
        LoginService.userLogin(authCode)
          .then(function (response) {
              console.log("Back.userLogin.Response: " + JSON.stringify(response.data));

              if (response.data.authenticated) {
                localStorage.setItem('userDB', JSON.stringify(response.data));
                self.setUserName(response.data.nickname);


                // $rootScope.$broadcast('userSet', response.data.nickname);
                /*
                 Notification.success("Welcome! Successfully logged in");
                 authService.login(response.data.token);
                 $window.location.assign('/#/');
                 */
              }
            },
            function (error) {
              console.log(error);
            });
      }
    });
  }

})();
