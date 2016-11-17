(function () {

  'use strict';

  angular
    .module('myApp')
    .service('authService', authService);

  authService.$inject = ['$route', '$window', '$state', '$rootScope', 'lock', 'authManager', '$location'];

  function authService($route, $window, $state, $rootScope, lock, authManager, $location) {
    /*var lock = new Auth0Lock(
     'BCL0BYCBdbFUmrJh16lG2CB1MZsxz7ex',
     'marchionnelattenero.auth0.com',
     {
     auth: {
     redirect: true,
     redirectUrl: 'http://localhost:9000/#/main'
     }
     }
     );*/

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
//
          console.log('user: ' + self.userProfile);
          self.userProfile = JSON.stringify(profile);
          console.log('user: ' + self.userProfile);

          console.log('id_token' + authResult.idToken);
          console.log('profile' + JSON.stringify(profile));
//
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
