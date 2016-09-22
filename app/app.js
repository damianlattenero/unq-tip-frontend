'use strict';

// Declare app level module which depends on views, and components
angular
  .module('myApp', [
    'ngRoute',
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/product/product.html',
      controller: 'ProductsCtrl',
      controllerAs: 'productsCtrl'
    })
    $routeProvider.when('/foodOrder', {
      templateUrl: 'views/foodOrder/foodOrder.html',
      controller: 'FoodOrderCtrl',
      controllerAs: 'foodOrderCtrl'
    })
  }
);
