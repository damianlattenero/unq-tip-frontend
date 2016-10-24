(function () {

  'use strict';

  angular
    .module('myApp')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];
  /*var lock = new Auth0Lock(
    'BCL0BYCBdbFUmrJh16lG2CB1MZsxz7ex',
    'marchionnelattenero.auth0.com',
    {
      auth: {
        redirect: true
      }
    }
  );
*/
/*  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }

      localStorage.setItem('token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
    });

  });*/

  function authService($rootScope, lock, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show({
        callbackUrl: '/#/',
        state: location.href
      })
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
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
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})();
