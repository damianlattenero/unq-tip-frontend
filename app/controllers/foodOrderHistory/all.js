'use strict';

/**
 * @ngdoc function
 * @name tipMarchionneLattenero.controller:FoodOrderHistoryCtrl
 * @description
 * # FoodOrderHistoryCtrl
 * Controller of the tipMarchionneLattenero
 */

angular.module('myApp')
  .controller('FoodOrderHistoryCtrl', function ($scope, FoodOrderHistoryService) {
    return new FoodOrderHistoryController($scope, FoodOrderHistoryService);
  });

function FoodOrderHistoryController($scope, FoodOrderHistoryService) {
  var self = this;

  this.orderHistories = [];

  this.f = {};

  this.filter_by_ge = function (field, date) {
    console.log(field + ": " + date + " - " + new Date(date).toString('dd-MM-yyyy'));
    if (date === '') {
      delete self.f['ge_' + field];
      return;
    }
    self.f['ge_' + field] = true;
    self.orderHistories.forEach(function (ordersHistory) {
      ordersHistory['ge_' + field] = (ordersHistory[field] >= date);
    })
  };

  this.filter_by_le = function (field, date) {
    console.log(field + ": " + date + " - " + new Date(date).toString('dd-MM-yyyy'));
    if (date === '') {
      delete self.f['le_' + field];
      return;
    }
    self.f['le_' + field] = true;
    self.orderHistories.forEach(function (ordersHistory) {
      // console.log("ordersHistory: " + ordersHistory[field] + " - " + new Date(ordersHistory[field]).toString('dd-MM-yyyy'));
      ordersHistory['le_' + field] = (ordersHistory[field] <= date);
    })
  };

  this.getAll = function () {
    FoodOrderHistoryService.getAll()
      .then(function successCallback(response) {
        self.orderHistories = response.data;
      });
  };

  this.getAll();

  $(function () {
    $('#from').datetimepicker();
    $('#to').datetimepicker({useCurrent: false});

    $("#from").on("dp.change", function (e) {
      $('#to').data("DateTimePicker").minDate(e.date);
      var date = new Date(e.date);
      date.setUTCHours(0,0,0,0);
      self.filter_by_ge('moment', date.getTime())
    });

    $("#to").on("dp.change", function (e) {
      $('#from').data("DateTimePicker").maxDate(e.date);
      var date = new Date(e.date);
      date.setUTCHours(0,0,0,0);
      self.filter_by_le('moment', date.getTime())
    });
  });

}
