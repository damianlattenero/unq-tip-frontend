'use strict';
/**
 * @ngdoc service
 * @name tipMarchionneLattenero.authService
 * @description
 * # authService
 * Service in the tipMarchionneLattenero.
 */

(function () {
  angular
    .module('myApp')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock'];

  function authService($rootScope, lock) {
    var self = this;

    function login() {
      lock.show({
        callbackUrl: '/#/main',
        state: location.href = '/#/main'
      })
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      $rootScope.$broadcast('userProfileClear', "");
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);

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
