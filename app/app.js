'use strict';

// Declare app level module which depends on views, and components
angular
  .module('myApp', [
    'ngRoute',
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
    }
  );
