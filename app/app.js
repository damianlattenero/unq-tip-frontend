'use strict';

// Declare app level module which depends on views, and components


var app = angular
  .module('myApp', [
    'ngRoute',
    //'ErrorCatcher',
    'config',
    'auth0.lock',
    'angular-jwt',
    'ui.router'
  ])
  .config(function ($routeProvider, lockProvider, $urlRouterProvider) {

    lockProvider.init({
      clientID: 'BCL0BYCBdbFUmrJh16lG2CB1MZsxz7ex',
      domain: 'marchionnelattenero.auth0.com',
      callbackURL: 'http://localhost:9000/#/main'
    });

    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login/login.html',
        controllerAs: 'vm',
        requireAuth: false
      })
      .when('/main', {
        url: '/main',
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireAuth: true
      })
      .when('/products', {
        url: '/products',
        templateUrl: 'views/product/product.html',
        controller: 'ProductsCtrl',
        controllerAs: 'productsCtrl',
        requireAuth: false
      })
      .when('/foodOrder', {
        url: '/foodOrder',
        templateUrl: 'views/foodOrder/foodOrder.html',
        controller: 'FoodOrderCtrl',
        controllerAs: 'foodOrderCtrl',
        requireAuth: true
      })
      .otherwise({redirectTo: '/login'});

      //$urlRouterProvider.otherwise('/login');
  })
  // .config(function Config($httpProvider, jwtOptionsProvider) {
  .config(function Config($httpProvider, $stateProvider, lockProvider, jwtOptionsProvider) {
  //.config(function Config($httpProvider, $stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {
  //.config(function config($stateProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['marchionnelattenero.auth0.com','localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  })

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

app.run(function($rootScope, authService, lock, authManager) {
  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthenticationListener();

  // Register the synchronous hash parser
  // when using UI Router
  lock.interceptHash()

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();
});



