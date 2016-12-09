'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('CacheController', function ($rootScope, $interval,CacheService,LoginService) {
    return new CacheController($rootScope, $interval,CacheService,LoginService);
  });

function CacheController($rootScope, $interval, CacheService, LoginService) {
  var self = this;

  $rootScope.productsByUsers = [];
  $rootScope.cachePlaces = [];

  this.getCacheUsers = function () {
    CacheService.getUsers()
      .then(function successCallback(response) {
        $rootScope.productsByUsers = response.data[LoginService.getToken()].allProductsPending;
      });
  };

  this.getCacheUsers();

  this.getCachePlaces = function () {
    CacheService.getPlaces()
      .then(function successCallback(response) {
        $rootScope.cachePlaces = response.data;
      });
  };

  this.getCachePlaces();

  $interval(function () {
    if ($rootScope.isAuthenticated && $rootScope.autoRefresh){
      console.log("Updating All Cache ...");
      self.getCacheUsers();
      self.getCachePlaces();
    }
  }, 1500);


}

