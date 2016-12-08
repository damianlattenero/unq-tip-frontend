'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('CacheController', function (CacheService) {
    return new CacheController(CacheService);
  });

function CacheController(CacheService) {
  var self = this;

  this.cacheUsers = [];
  this.cachePlaces = [];
  this.cacheProducts = [];

  this.getCacheUsers = function () {
    CacheService.getUsers()
      .then(function successCallback(response) {
        self.orders = response.data;
      });
  };

  this.getCachePlaces = function () {
    CacheService.getPlaces()
      .then(function successCallback(response) {
        self.orders = response.data;
      });
  };

  this.getCacheProducts = function () {
    CacheService.getProducts()
      .then(function successCallback(response) {
        self.orders = response.data;
      });
  };

  this.getCacheUsers();
  this.getCachePlaces();
  this.getCacheProducts();

}

