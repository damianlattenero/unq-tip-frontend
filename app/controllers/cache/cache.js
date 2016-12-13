'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:CacheCtrl
 * @description
 * # CacheCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('CacheCtrl', function ($rootScope, $interval, CacheService, LoginService, Notification) {
    return new CacheController($rootScope, $interval, CacheService, LoginService, Notification);
  });

function CacheController($rootScope, $interval, CacheService, LoginService, Notification) {
  var self = this;

  $rootScope.productsByUsers = {};
  $rootScope.cachePlaces = {};

  this.getCacheUsers = function () {
    var oldProducts = $rootScope.productsByUsers;

    CacheService.getUsers()
      .then(function successCallback(response) {

        $rootScope.productsByUsers = response.data[LoginService.getUserId()].allProductsPending;

        var newProducts = $rootScope.productsByUsers;

        if (self.isFront()) {
          $rootScope.products.map(function (product) {
            if (self.getPendingForProduct(newProducts, product.id) < self.getPendingForProduct(oldProducts, product.id)) {
              Notification.success("Tenes una orden de " + product.name.toUpperCase() + " lista para retirar!");
            }
          });
        }

      });
  };

  this.getCacheUsers();

  this.getCachePlaces = function () {
    var oldProductsInPlace = $rootScope.cachePlaces;

    CacheService.getPlaces()
      .then(function successCallback(response) {
        $rootScope.cachePlaces = response.data;

        var newProductsInPlace = $rootScope.cachePlaces;

        if (self.isKitchen()) {
          $rootScope.products.map(function (product) {
              if (self.getPendingForProduct(newProductsInPlace, product.id) > self.getPendingForProduct(oldProductsInPlace, product.id)) {
                Notification.success("Tenes una pedido de " + product.name.toUpperCase() + "!");
              }
            });
        }

      });

  };


  this.getCachePlaces();

  $interval(function () {
    if ($rootScope.isAuthenticated && $rootScope.autoRefresh) {
      console.log("Updating All Cache ...");
      self.getCacheUsers();
      self.getCachePlaces();
    }
  }, 1500);


  this.getPendingForProduct = function (userProducts, productID) {
    return (userProducts == null) ? 0 :
      !userProducts.hasOwnProperty(productID) ? 0 : userProducts[productID]
  };

  this.isFront = function () {
    return $rootScope.place != "COCINA";
  };

  this.isKitchen = function () {
    return !this.isFront();
  };

}




