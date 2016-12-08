'use strict';

(function () {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', 'authService', 'lock', 'LoginService', 'authManager', '$window', '$timeout'];

  function LoginController($rootScope, authService, lock, LoginService, authManager, $window) {


    var self = this;
    self.authService = authService;

    this.userName = "";

    $rootScope.place = "";

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
/*
      lock.show({
        flashMessage: {
          type: 'success',
          text: message
        }
      });
      $timeout(function () { lock.hide(); }, 3000);
*/
    };

    this.loginFail = function (message) {
      console.log("Error al registrar el Usuario: " + message);

      lock.show({
        flashMessage: {
          type: 'error',
          text: message
        }
      });

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

    this.logoutFail = function (message, details) {
      console.log("logout Failure! " + message);
      console.log(details);
      alert("logout Failure! " + message);
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
              else {
                self.logoutFail("Error en el Servidor.", error);
              }
            },
            function (error) {
              self.logoutFail("Error en la red.", error);
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
                var userDB = JSON.parse(localStorage.getItem('userDB'));
                $rootScope.place = userDB.place;
                console.log($rootScope.place)
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
      console.log("Looking for User");
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
