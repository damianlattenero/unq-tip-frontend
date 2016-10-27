(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','$location','authService'];

  function LoginController($scope, $location, authService) {

    var vm = this;
    vm.authService = authService;

    $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {
      // if (newUrl.requiredAuth && (localStorage.getItem('id_token')!='')){
      if (newUrl.requiredAuth){
        $location.path("/login");
      }
    })
  }

})();
