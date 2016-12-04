'use strict';

(function () {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', 'authService', 'LoginService', 'authManager', $window];

  function LoginController($rootScope, authService, LoginService, authManager, $window) {

    var self = this;
    self.authService = authService;

    this.userName = "";

    this.place = "COCINA";

    this.isAuthenticatingWithDB = false;

    this.setUserName = function (data) {
      self.userName = data;
      $rootScope.userName = data;
    };

    this.isLogIn = function () {
      return $rootScope.isAuthenticated && $rootScope.logginWithBackend;
    };

    this.login = function () {
      self.authService.login();
    };

    this.loginSuccess = function (user, message) {
      console.log("loginSuccess: user=" + user + ". msg:" + message);
      self.setUserName(user);
      $rootScope.logginWithBackend = true;
      authManager.authenticate();
      $window.location.assign('/#/main');
      // Notification.success("Welcome! Successfully logged in");
      // alert("loginSuccess: " + message);
    };

    this.loginFail = function (message) {
      alert("loginFail: " + message);
      console.log("Error al registrar el Usuario: " + message);
      self.logoutSuccess();
    };

    this.logoutSuccess = function () {
      $rootScope.logginWithBackend = false;
      localStorage.removeItem('userDB');
      self.setUserName("");
      authManager.unauthenticate();
      authService.logout();
      $window.location.assign('/#/login');
    };

    this.logout = function () {
      var authCode = {
        token: localStorage.getItem('id_token'),
        userId: localStorage.getItem('profile').user_id
      };
      console.log(JSON.stringify(authCode));

      if ($rootScope.logginWithBackend) {
        LoginService.userLogout(authCode)
          .then(function (response) {
              console.log("Back.userLogout.Response: " + JSON.stringify(response.data));

              if (response.data.authenticated) {
                self.logoutSuccess();
              }
              else
              {
                console.log("logout Failure! Error en el Servidor.");
                console.log(error);
                alert("logout Failure! Error en el Servidor.");
              }
            },
            function (error) {
              console.log("logout Failure! Error en la red.");
              console.log(error);
              alert("logout Failure! Error en la red.");
            });
      }
    };

    $rootScope.$on("userProfileSet", function (event, obj) {
      var authCode = {
        token: localStorage.getItem('id_token'),
        userId: obj.user_id
      };
      console.log(JSON.stringify(authCode));

      if (!$rootScope.logginWithBackend) {
        LoginService.userLogin(authCode)
          .then(function (response) {
              console.log("Back.userLogin.Response: " + JSON.stringify(response.data));

              if (response.data.authenticated && response.data.signedIn) {
                localStorage.setItem('userDB', JSON.stringify(response.data));
                self.loginSuccess(response.data.nickname, response.data.message);
              }
              else {
                self.loginFail(response.data.message);
              }
            },
            function (error) {
              self.loginFail(JSON.stringify(error));
            });
      }
    });

    this.refresh = function () {
      console.log("Recuperando User");
      try {
        var userDB = JSON.parse(localStorage.getItem('userDB'));
      }
      catch (err) {
        userDB = {};
      }

      if (userDB != null && userDB != {}) {
        if (userDB.authenticated && userDB.signedIn) {
          // self.loginSuccess(userDB.nickname, "refresh");
          self.setUserName(userDB.nickname);
          $rootScope.logginWithBackend = true;
          authManager.authenticate();
        }
      }
      else {
        // self.loginFail("refresh");
        $rootScope.logginWithBackend = false;
        authManager.unauthenticate();
      }

    };

    self.refresh();

  }

})();
