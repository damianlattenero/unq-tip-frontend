'use strict';

// Declare app level module which depends on views, and components
angular
  .module('myApp', [
    'ngRoute',
    //'ErrorCatcher',
    'config'
  ])
  .config(function ($routeProvider) {
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
  })

/*
  .config(function ($provide) {
    $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
        return function (exception, cause) {
          var $rootScope = $injector.get("$rootScope");
          $rootScope.addExceptionAlert({message: "Exception", reason: exception});
          // This represents a custom method that exists within $rootScope
          $delegate(exception, cause);
        };
      }
    )
  })
*/
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
  });
;
