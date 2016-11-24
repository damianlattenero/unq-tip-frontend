(function () {

  'use strict';

  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', 'authService'];

  function LoginController($rootScope, authService) {

    var vm = this;
    vm.authService = authService;

    $rootScope.$on("userProfileSet", function (event, obj) {
      vm.authService.userProfile = obj;
    });
  }

})();
