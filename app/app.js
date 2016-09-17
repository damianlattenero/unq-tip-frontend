'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
  }])

  .controller('ProductsController', function($scope) {
    $scope.products = [
      {name:'Mila Completo', count: 0},
      {name:'Hamburguesa c/Queso', count: 0}
    ];
  })
;

