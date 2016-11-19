(function () {

  'use strict';

  angular
    .module('myApp')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];

  function authService($rootScope, lock, authManager) {
    var self = this;

    try {
      var block = JSON.parse(localStorage.getItem('profile'));
    }
    catch (err) {
      block = {};
    }

    this.userProfile = block;


    function login() {

      lock.show({
        callbackUrl: '/#/main',
        state: location.href = '/#/main'
      })
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      self.userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);

        });
      });
    }

    return {
      userProfile: self.userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }

})();
