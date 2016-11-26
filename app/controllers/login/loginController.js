'use strict';

(function () {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', 'authService', 'LoginService'];

  function LoginController($rootScope, authService, LoginService) {

    var self = this;
    self.authService = authService;

    this.userName = "";

    this.setUserName = function(data) {
      self.userName = data;
      $rootScope.userName = data;
    }

    this.login = function () {
      self.authService.login();
    };

    this.logout = function () {
      self.authService.logout();
    };

    $rootScope.$on("userProfileClear", function (event, obj) {
      localStorage.removeItem('userDB');
      self.setUserName("");
    });

    $rootScope.$on("userProfileSet", function (event, obj) {
      self.authService.userProfile = obj;
      self.userName = obj.nickname;

      var authCode = {
        authorizationCode: (obj == null) ? "" : obj.clientID
      };

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
    });
  }

})();
