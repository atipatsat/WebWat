'use strict';

/* App Module */

var watPhaSomApp = angular.module('watPhaSomApp', [
  'ngRoute',
  'ngCookies',
  'ngNotify',
  'appControllers',
  'appServices'
]);

watPhaSomApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/', {
          templateUrl: 'partials/home/home.html',
          controller: 'HomeCtrl'
          }).
        /*Home*/
        when('/login/', {
          templateUrl: 'partials/home/login.html',
          controller: 'LoginCtrl'
        }).
        when('/register/', {
          templateUrl: 'partials/home/register.html',
          controller: 'RegisterCtrl'
        }).
        when('/product/:id', {
          templateUrl: 'partials/product/detail.html',
          controller: 'DetailCtrl'
        }).
        when('/product/:id/review', {
          templateUrl: 'partials/product/review.html',
          controller: 'ReviewCtrl'
        }).

        /*Admin*/
        when('/admin/', {
           templateUrl: 'partials/admin/manage.html',
           controller: 'AdminCtrl'
        }).
        when('/admin/login/', {
           templateUrl: 'partials/home/login.html',
           controller: 'AdminLoginCtrl'
        }).
        when('/admin/members/', {
           templateUrl: 'partials/admin/members.html',
           controller: 'AdminMembersCtrl'
        }).
        when('/admin/products/', {
           templateUrl: 'partials/admin/products.html',
           controller: 'AdminProductsCtrl'
        }).
        when('/admin/products/create', {
           templateUrl: 'partials/admin/create.html',
           controller: 'AdminProductCreateCtrl'
        }).
        when('/admin/products/edit/:id', {
           templateUrl: 'partials/admin/create.html',
           controller: 'AdminProductEditCtrl'
        }).
        when('/admin/order/:id', {
           templateUrl: 'partials/admin/order.html',
           controller: 'AdminOrderCtrl'
        }).
        when('/admin/orders/', {
           templateUrl: 'partials/admin/orders.html',
           controller: 'AdminOrdersCtrl'
        }).
        when('/admin/payments/', {
           templateUrl: 'partials/admin/payments.html',
           controller: 'AdminPaymentsCtrl'
        }).
        when('/admin/check/:id', {
            templateUrl: 'partials/admin/check.html',
            controller: 'AdminCheckCtrl'
        }).

        /*User*/
        when('/cart/', {
           templateUrl: 'partials/product/cart.html',
           controller: 'CartCtrl'
        }).
        when('/order/', {
           templateUrl: 'partials/product/order.html',
           controller: 'OrderCtrl'
        }).
        when('/orders/', {
           templateUrl: 'partials/product/orders.html',
           controller: 'OrdersCtrl'
        }).
        when('/payment/', {
           templateUrl: 'partials/product/confirm.html',
           controller: 'ConfirmCtrl'
        }).
        when('/payment/normal', {
           templateUrl: 'partials/product/normalPay.html',
           controller: 'PaymentCtrl'
        }).
        when('/payment/paypal', {
           templateUrl: 'partials/product/paypal.html',
           controller: 'PaypalCtrl'
        }).
        when('/summary', {
           templateUrl: 'partials/product/summary.html',
           controller: 'SummaryCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);
