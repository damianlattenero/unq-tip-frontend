'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  // 'myApp.order',
  'myApp.version'
])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/order/order.html',
        controller: 'OrderCtrl',
        controllerAs: 'products'
      })
      .otherwise({redirectTo: '/'});
  }])
;

