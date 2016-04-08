var app = angular.module('customers', ['ui.bootstrap']);


app.controller('CustomersCtrl', require('./customersController'));
app.factory('CustomerService', require('./customersService'));
app.directive('customerSearch', require('./customerSearchDirective'));
app.directive('customerTable', require('./customerTableDirective'));

