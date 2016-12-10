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

  this.filter = {};

  this.find = function () {
    self.filter.productName = self.filterProductName;

    var dateFrom = $('#from').data("DateTimePicker").date();
    if (dateFrom != null) {
      dateFrom = new Date(dateFrom._d);
      dateFrom.setUTCHours(0, 0, 0, 0);
      self.filter_by_ge(self.filter, 'moment', dateFrom.getTime());
    }
    else
      self.filter_by_ge(self.filter, 'moment', 0);


    var dateTo = $('#to').data("DateTimePicker").date();
    if (dateTo != null) {
      dateTo = new Date(dateTo._d);
      dateTo.setUTCHours(0, 0, 0, 0);
      self.filter_by_le(self.filter, 'moment', dateTo.getTime());
    }
    else
      self.filter_by_le(self.filter, 'moment', 0);

  };


  this.filter_by_ge = function (filter, field, date) {
    console.log(field + ": " + date + " - " + new Date(date).toString('dd-MM-yyyy'));
    if ((date == null) || (date == 0) || (date === '')) {
      delete filter['ge_' + field];
      return;
    }
    filter['ge_' + field] = true;
    self.orderHistories.forEach(function (ordersHistory) {
      ordersHistory['ge_' + field] = (ordersHistory[field] >= date);
    });
  };

  this.filter_by_le = function (filter, field, date) {
    console.log(field + ": " + date + " - " + new Date(date).toString('dd-MM-yyyy'));
    if ((date == null) || (date === 0) || (date === '')) {
      console.log("borro propiedad Date");
      delete filter['le_' + field];
      return;
    }
    filter['le_' + field] = true;
    self.orderHistories.forEach(function (ordersHistory) {
      ordersHistory['le_' + field] = (ordersHistory[field] <= date);
    });
  };

  this.getAll = function () {
    FoodOrderHistoryService.getAll()
      .then(function successCallback(response) {
        self.orderHistories = response.data;
      });
  };

  this.getAll();

  $(function () {
    var day = new Date();

    $('#from').datetimepicker({defaultDate: day});
    $('#to').datetimepicker({defaultDate: day, useCurrent: false});

    $("#from").on("dp.change", function (e) {
      $('#to').data("DateTimePicker").minDate(e.date);
    });

    $("#to").on("dp.change", function (e) {
      $('#from').data("DateTimePicker").maxDate(e.date);
    });
  });

}
