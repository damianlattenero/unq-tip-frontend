'use strict';

// Declare app level module which depends on views, and components


var app = angular
  .module('myApp', [
    'ngRoute',
    //'ErrorCatcher',
    'config',
    'auth0.lock',
    'angular-jwt',
    'ui-notification',
    'ui.router'
  ])
  .config(function ($routeProvider, lockProvider) {


    lockProvider.init({
      clientID: 'BCL0BYCBdbFUmrJh16lG2CB1MZsxz7ex',
      domain: 'marchionnelattenero.auth0.com',
      options: {
        theme: {
          logo: './assets/images/virtualkiosklogo.png',
          primaryColor: "#b81b1c"
        },
        languageDictionary: {
          title: "Virtual Kiosk",
          emailInputPlaceholder: "nombre@mail.com"
        },
        language: 'es',
        rememberLastLogin: false
      }
    });

    $routeProvider
      .when('/login', {
        // controller: 'LoginController',
        templateUrl: 'views/login/login.html',
        controllerAs: 'mainCtrl',
        requireAuth: false
      })
      .when('/main', {
        url: '/main',
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
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
        controller: 'AllFoodOrderCtrl',
        controllerAs: 'foodOrderCtrl',
        requireAuth: true
      })
      .when('/foodOrderHistory', {
        url: '/foodOrderHistory',
        templateUrl: 'views/foodOrderHistory/foodOrderHistory.html',
        controller: 'FoodOrderHistoryCtrl',
        controllerAs: 'foodOrderHistoryCtrl',
        requireAuth: true
      })
      .when('/foodOrderClosure', {
        url: '/foodOrderClosure',
        templateUrl: 'views/foodOrderClosure/foodOrderClosure.html',
        controller: 'FoodOrderClosureCtrl',
        controllerAs: 'foodOrderClosureCtrl',
        requireAuth: true
      })
      .when('/foodOrderClosureGenerate', {
        url: '/foodOrderClosureGenerate',
        templateUrl: 'views/foodOrderClosure/foodOrderClosureGenerate.html',
        controller: 'FoodOrderClosureCtrl',
        controllerAs: 'foodOrderClosureCtrl',
        requireAuth: true
      })
      .otherwise({redirectTo: '/login'});
  })
  .config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  })
  .config(function Config($httpProvider, $stateProvider, lockProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['marchionnelattenero.auth0.com', 'localhost'],
      authenticatedRedirectPath: '/#/main',
      unauthenticatedRedirectPath: '/#/login'
    });

    //To force jwtInterceptor call tokenGetter for each request set
    // jwtInterceptorProvider.forceHeadersUpdate = true;

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

app.run(function ($rootScope, authService, lock, authManager) {
  $.material.init();

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthenticationListener();

  // Register the synchronous hash parser
  // when using UI Router
  lock.interceptHash();

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();
});

app.filter('abs', function () {
  return function (val) {
    return Math.abs(val);
  }
});
