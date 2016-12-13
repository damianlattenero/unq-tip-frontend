'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderCtrl
 * @description
 * # FoodOrderCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('CacheController', function ($rootScope, $interval, CacheService, LoginService, Notification) {
    return new CacheController($rootScope, $interval, CacheService, LoginService, Notification);
  });

function CacheController($rootScope, $interval, CacheService, LoginService, Notification) {
  var self = this;

  $rootScope.productsByUsers = {};
  $rootScope.cachePlaces = {};

  this.getCacheUsers = function () {

    var myOldProducts = $rootScope.productsByUsers;

    CacheService.getUsers()
      .then(function successCallback(response) {

        $rootScope.productsByUsers = response.data[LoginService.getUserId()].allProductsPending;

        var myProducts = $rootScope.productsByUsers;

        $rootScope.products.map(function (product) {
          if ($rootScope.getPendingForProduct(myProducts, product.id) < $rootScope.getPendingForProduct(myOldProducts, product.id)) {
            if ($rootScope.place != "COCINA") {
              Notification.success("Tenes una orden de " + product.name.toUpperCase() + " lista para retirar!");
            }
          }
        });

      });
  };

  this.getCacheUsers();

  this.getCachePlaces = function () {
    var oldProductsInKitchen = $rootScope.cachePlaces

    // var oldProductsInKitchen = $rootScope.cachePlaces.COCINA.allProductsPending;

    CacheService.getPlaces()
      .then(function successCallback(response) {
        $rootScope.cachePlaces = response.data;

        var productsInKitchen = $rootScope.cachePlaces

        $rootScope.products.map(function (product) {
          if ($rootScope.getPendingForProduct(productsInKitchen, product.id) >
            $rootScope.getPendingForProduct(oldProductsInKitchen, product.id)) {
            if ($rootScope.place == "COCINA") {
              Notification.success("Tenes una orden de " + product.name.toUpperCase() + "!");
            }
          }
        });
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


  $rootScope.getPendingForProduct = function (userProducts, productID) {
    return (userProducts == null) ?
      0 :
      !userProducts.hasOwnProperty(productID) ?
        0 : userProducts[productID]
  }
}




