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

function CacheController($rootScope, $interval,CacheService,LoginService) {
  var self = this;

  this.productsByUsers = [];
  this.cachePlaces = [];
  this.cacheProducts = [];

  this.getCacheUsers = function () {
    CacheService.getUsers()
      .then(function successCallback(response) {
        self.productsByUsers = response.data[LoginService.getToken()].allProductsPending;
      });
  };

  this.getCacheUsers();

  this.getCachePlaces = function () {
    CacheService.getPlaces()
      .then(function successCallback(response) {
        self.cachePlaces = response.data;
      });
  };

  this.getCachePlaces();

  this.getCacheProducts = function () {
    CacheService.getProducts()
      .then(function successCallback(response) {
        self.cacheProducts = response.data;
      });
  };

  this.getCacheProducts();

  this.getPendingForProduct = function(productID, isFront){
    if(isFront){
      if (!self.productsByUsers.hasOwnProperty(productID)) {
        return 0;
      } else {
        return self.productsByUsers[productID];
      }
    }else{
      return self.cacheProducts[productID]
    }
  }

  $interval(function () {
    if ($rootScope.isAuthenticated && self.autoRefresh)
      self.getCacheProducts();
  }, 1000);

  this.getCacheUsers();
  this.getCachePlaces();
  this.getCacheProducts();

}

