(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$window', '$state', '$timeout','$location','authService'];

  function LoginController($window, $state, $timeout, $location, authService) {

    var vm = this;
    vm.authService = authService;

    this.refresh = function () {
      /*$window.location.reload(true);
      /!*$timeout(function () {
        $state.go('/main');
      });*!/

      $window.location.href = '/#/main';
      $state.go($state.current, {}, {reload: true});
      $state.reload();
      $state.transitionTo($state.current, $stateParams, {
        reload: true, inherit: false, notify: true
      });*/
    }
/*    $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {
      // if (newUrl.requiredAuth && (localStorage.getItem('id_token')!='')){
      if (newUrl.requiredAuth){
        $location.path("/login");
      }
    })*/
  }

})();
