'use strict';

// Declare app level module which depends on views, and components


var app = angular
  .module('myApp', [
    'ngRoute',
    //'ErrorCatcher',
    'config',
    'auth0.lock',
    'angular-jwt'
  ])
  .config(function ($routeProvider, lockProvider) {

    lockProvider.init({
      clientID: 'BCL0BYCBdbFUmrJh16lG2CB1MZsxz7ex',
      domain: 'marchionnelattenero.auth0.com',
      callbackURL: 'http://localhost:9000/#/'
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/products', {
        templateUrl: 'views/product/product.html',
        controller: 'ProductsCtrl',
        controllerAs: 'productsCtrl'
      })
      .when('/foodOrder', {
        templateUrl: 'views/foodOrder/foodOrder.html',
        controller: 'FoodOrderCtrl',
        controllerAs: 'foodOrderCtrl'
      })
      .when('/login', {
        controller: 'loginController',
        templateUrl: 'views/login/login.html'
      });
  })
  .config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({


      whiteListedDomains: ['marchionnelattenero.auth0.com', 'localhost']
    });
  })

  /*.config(function config($routeProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {

   jwtOptionsProvider.config({
   tokenGetter: function () {
   return localStorage.getItem('id_token');
   }
   });

   $httpProvider.interceptors.push('jwtInterceptor');
   })*/

  //Add Time details for Errors
  .config(['$provide', function ($provide) {
    $provide.decorator('$log', ['$delegate', function ($delegate) {
      var origError = $delegate.error;

      $delegate.error = function () {
        var args = [].slice.call(arguments);
        args[0] = [new Date().toString(), ': ', args[0]].join('');
        origError.apply(null, args)
      };
      return $delegate;
    }]);
  }])

  //Manage all Http errors
  .factory('errorHttpInterceptor', function ($exceptionHandler, $q) {
    return {
      responseError: function responseError(rejection) {
        $exceptionHandler("An HTTP request error has occurred.\nHTTP config: " + rejection.config + ".\nStatus: " + rejection.status);
        return $q.reject(rejection);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
  })



  //Manage All Errors
  .factory('$exceptionHandler', ['$log', function ($log) {
    return function myExceptionHandler(exception) {
      $log.error(exception);
      document.getElementById('errors').innerHTML = exception;
    };
  }]);

app.run(function(authService) {

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  authService.registerAuthenticationListener();
});



