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



/* Controllers */

var appControllers = angular.module('appControllers', []);

/*Home Controllers*/
appControllers.controller('HomeCtrl', ['$scope', '$location', '$cookies',  'ProductSrv', 'CartSrv', 'ngNotify',
    function($scope, $location, $cookies, productSrv, cartSrv, ngNotify) {
        var self = this;
        $scope.products = productSrv.list;
        $scope.addToCart = function(product){
            if($cookies.get('auth')? true: false){
                cartSrv.add(product,1);
                ngNotify.set("New Item Added.", 'success');
            }else{
                $location.path('/login/');
            }
        };
        $scope.isWholesale = function(){
            var user = JSON.parse($cookies.get('user'));
            if(user.type == 2){return true;}
            return false;
        };
    }]);

appControllers.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'UserSrv',
    function($scope, $rootScope, $location, $cookies, userSrv) {
    var self = this;
    $scope.user = {};
    $scope.isInValid = false;
    $scope.validate = function(user){
        if(userSrv.validate(user)){
            $cookies.put('auth',true);
            $cookies.put('user',JSON.stringify(user));
            $rootScope.$broadcast('isUser');
            $location.path('/product');
            $location.replace();
        }else{
            $scope.isInValid = true;
        }
    };
}]);

appControllers.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'UserSrv',
    function($scope, $rootScope, $location, $cookies, $http, userSrv) {
    var self = this;
    $scope.user = {username: "", password: "", type: 1};
    $scope.isInValid = false;
    $scope.validate = function(user){
        if(userSrv.register(user)){
            $cookies.put('auth',true);
            $rootScope.$broadcast('isUser');
            $location.path('/product');
            $location.replace();
        }else{
            $scope.isInValid = true;
        }
    };
}]);
appControllers.controller('DetailCtrl', ['$scope', '$routeParams', 'ProductSrv',
    function($scope, $routeParams, productSrv) {
        var self = this;
        $scope.product = productSrv.getById($routeParams.id);
    }
]);
appControllers.controller('ReviewCtrl', ['$scope', '$routeParams', 'ProductSrv',
    function($scope, $routeParams, productSrv) {
        var self = this;
        $scope.product = productSrv.getById($routeParams.id);
    }
]);

/*Admin Controllers*/
appControllers.controller('AdminCtrl', ['$scope', 'OrderSrv', 'PaymentSrv',
    function($scope, orderSrv, paymentSrv) {
    $scope.orders = orderSrv.list;
    $scope.payments = paymentSrv.list;
}]);
appControllers.controller('AdminLoginCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'AdminSrv',
    function($scope, $rootScope, $location, $cookies, $http, userSrv) {
    var self = this;
    $scope.user = {};
    $scope.isInValid = false;
    $scope.validate = function(user){
//         var req = {
//         method: 'POST',
//         url: 'http://localhost:8090/admin/auth',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         data: { "username": user.username, "password": user.password }
//        }
//        $http(req).then(function successCallback(response) {
//            console.log(response);
//          }, function errorCallback(response) {
//            console.log(response);
//        });

        if(userSrv.validate(user)){
            $cookies.put('admin',true);
            $rootScope.$broadcast('isAdmin');
            $location.path('/product');
            $location.replace();
        }else{
            $scope.isInValid = true;
        }
    };
}]);
appControllers.controller('AdminMembersCtrl', ['$scope', '$location','UserSrv',
    function($scope, $location, userSrv) {
    $scope.members = userSrv.list;
    $scope.delete = function(index){
       userSrv.del(index);
    }
}]);
appControllers.controller('AdminProductsCtrl', ['$scope', '$location','ProductSrv',
    function($scope, $location, productSrv) {
    $scope.products = productSrv.list;
    $scope.edit = function(product){
        var path = '#/admin/products/edit/' + product.id + '/';
        $location.path(path);
    }
    $scope.delete = function(index){
       productSrv.del(index);
    }
}]);
appControllers.controller('AdminProductCreateCtrl', ['$scope', '$routeParams', 'ProductSrv', 'ngNotify',
    function($scope, $routeParams, productSrv, ngNotify) {
    $scope.product = {id: 0,name: '', price: 0, code: '', stock: 0}
    if($routeParams.id){
        $scope.product = productSrv.get($routeParams.id);
    }
    $scope.validate = function(product){
        if(product.name == ''){return false;}
        else if(product.price == 0){return false;}
        else if(product.code == ''){return false;}
        else if(product.stock == 0){return false;}
        else return true;
    };
    $scope.save = function(product){
        if(!$scope.validate(product)){
            return ngNotify.set('There is an data missing. Please check.', 'error');
        }
        product.id = productSrv.list.length + 1;
        productSrv.add(product);
        return ngNotify.set('Product updated.', 'success');
    };
}]);
appControllers.controller('AdminProductEditCtrl', ['$scope', '$routeParams', '$location', 'ProductSrv', 'ngNotify',
    function($scope, $routeParams, $location, productSrv, ngNotify) {
    $scope.product = {id: 0,name: '', price: 0, code: '', stock: 0}
    if($routeParams.id != ''){
        $scope.product = productSrv.get($routeParams.id);
    }
    $scope.validate = function(product){
        if(product.name == ''){return false;}
        else if(product.price == 0){return false;}
        else if(product.code == ''){return false;}
        else if(product.stock == 0){return false;}
        else return true;
    };
    $scope.save = function(product){
        if(!$scope.validate(product)){
            return ngNotify.set('There is an data missing. Please check.', 'error');
        }
        productSrv.update($routeParams.id,product);
        return ngNotify.set('New product added.', 'success');
    };
}]);
appControllers.controller('AdminOrderCtrl', ['$scope', '$routeParams', 'OrderSrv', 'ngNotify',
    function($scope, $routeParams, orderSrv, ngNotify) {
    $scope.order = orderSrv.list[$routeParams.id];
    $scope.transportFee = ($scope.order.transport == 2)? 800: 0;
    $scope.order.total = $scope.order.price + $scope.transportFee + ($scope.order.weight * 40);
    $scope.updateTotal = function(){
        $scope.order.total = $scope.order.price + $scope.transportFee + ($scope.order.weight * 40);
    }
    $scope.save = function(){
        $scope.order.fee = $scope.transportFee;
        ngNotify.set('Order updated.', 'success');
        orderSrv.update($routeParams.id,$scope.order);
    };
}]);
appControllers.controller('AdminOrdersCtrl', ['$scope', 'OrderSrv',
    function($scope, orderSrv) {
    $scope.orders = orderSrv.list;
}]);
appControllers.controller('AdminPaymentsCtrl', ['$scope', 'PaymentSrv',
    function($scope, paymentSrv) {
    $scope.payments = paymentSrv.list
}]);
appControllers.controller('AdminCheckCtrl', ['$scope', '$cookies', '$routeParams', 'PaymentSrv',
    function($scope, $cookies, $routeParams, paymentSrv) {
    $scope.payment = paymentSrv.list[$routeParams.id]
    $scope.print = function(payment){
        $cookies.put('payment',JSON.stringify(payment));
        var win = window.open('/partials/admin/print.html', '_blank');
        if(win){
            win.focus();
        }else{
            alert('Please allow popups for this site');
        }
    }
}]);

/*User Controllers*/
appControllers.controller('CartCtrl', ['$scope', '$cookies', '$timeout', '$location', 'CartSrv', 'OrderSrv', 'ngNotify',
    function($scope, $cookies, $timeout, $location, cartSrv, orderSrv, ngNotify) {
    $scope.order = {id: 0,label: '',address: '', transport: 2, status: 1, fee: 0, price: 0, total: 0, weight: 0, user: {}, items: []};
    $scope.items = cartSrv.order;
    $scope.delete = function(id){
        cartSrv.order.splice(id);
    };
    $scope.placeOrder = function(order){
        console.log('Here');
        order.id = orderSrv.list.length + 1;
        order.items = $scope.items;
        order.items.forEach(function(item, index){
            order.weight += item.product.weight * item.amount;
            order.price += item.product.price * item.amount;
        });
        order.user = JSON.parse($cookies.get('user'));
        order.label = 'WPS0' + orderSrv.list.length;
        orderSrv.add(order);
        ngNotify.set('New order placed. Please wait for admin to approve.', 'success');
        $timeout(function(){
            cartSrv.init();
            $cookies.put('order', JSON.stringify(order));
            $location.path('/orders');
        }, 2000);
    };
    $scope.isEnough = function(){
         var totalAmount = 0;
        $scope.items.forEach(function(item,index){
            totalAmount += item.amount;
        });
        if(totalAmount > 20) return false;
        else return true;
    };
}]);
appControllers.controller('ConfirmCtrl', ['$scope', '$cookies', '$location',
    function($scope, $cookies, $location) {
    $scope.payment = {order: null, method: 0};
    $scope.order = JSON.parse($cookies.get('order'));
    $scope.pay = function(order){
        $cookies.put('order', JSON.stringify(order));
        $location.path('/payment/normal');
    };
}]);
appControllers.controller('PaymentCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'OrderSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, orderSrv, ngNotify) {
    $scope.payment = {id: 0,order: null, proof: '', method: 0, status: 'Pending'};
    $scope.order = JSON.parse($cookies.get('order'));
    $scope.pay = function(payment){
        $scope.order.status = 4;
        orderSrv.updateById($scope.order);
        payment.order = $scope.order;
        payment.method = 1;
        payment.status = 'Paid';
        ngNotify.set('Thanks for purchase at us.','success');
        paymentSrv.add(payment);
//        $location.path('/summary');
    };
}]);
appControllers.controller('PaypalCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, ngNotify) {
    $scope.payment = {order: null, proof: '', method: 0};
    $scope.order = JSON.parse($cookies.get('order'));
    $scope.pay = function(payment){
        ngNotify.set('Save payment','success');
        paymentSrv.add(payment);
    };
}]);
appControllers.controller('SummaryCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, ngNotify) {
    $scope.payment = {order: null, proof: '', method: 0};
    $scope.order = JSON.parse($cookies.get('order'));
    $scope.pay = function(payment){
        ngNotify.set('Save payment','success');
        paymentSrv.add(payment);
    };
}]);
appControllers.controller('OrdersCtrl', ['$scope', '$cookies', '$location', 'OrderSrv',
    function($scope, $cookies, $location, orderSrv) {
    var user = JSON.parse($cookies.get('user'));
    $scope.orders = orderSrv.findByUser(user.username);
    $scope.pay = function(order){
        $cookies.put('order', JSON.stringify(order));
        $location.path('/payment');
    };
}]);

/*Shared Controllers*/
appControllers.controller('HeaderCtrl', ['$scope',
    function($scope) {
    //$scope.texts = ['A','B','C'];
}]);
appControllers.controller('FooterCtrl', ['$scope',
    function($scope) {
    var self = this;
    self.texts = ['A','B','C'];
//    $scope.texts = ['A','B','C'];
}]);
appControllers.controller('SideMenuCtrl', ['$scope', '$cookies', '$location',
    function($scope, $cookies, $location) {
    var self = this;
    self.texts = ['A','B','C'];
    $scope.$on('isAdmin',function(event, msg){self.updateIsAdmin();});
    $scope.$on('isUser',function(event, msg){self.updateIsUser();});

    self.isAdmin = $cookies.get('admin')? true: false;
    self.isUser = $cookies.get('auth')? true: false;

    self.updateIsAdmin = function(){
        self.isAdmin = $cookies.get('admin')? true: false;
    };
    self.updateIsUser = function(){
        self.isUser = $cookies.get('auth')? true: false;
    };

    self.logout = function(){
        console.log("test");
        $cookies.remove('auth');
        $cookies.remove('admin');
        self.updateIsAdmin();
        self.updateIsUser();
        $location.path('/#/');
    };
}]);



var appServices = angular.module('appServices', []);

appServices.factory('UserSrv', function($http) {
  var users = {};
  users.validate = function(user){
//    var req = {
//        method: 'POST',
//        url: 'http://localhost:8090/customer/auth',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        data: { "username" : user.username, "password" : user.password }
//    }
//    $http(req).then(function successCallback(response) {
//        return response.data;
//    }, function errorCallback(response) {
//        console.log(response);
//        return false;
//    });
//
    var valid = users.list[user.username];
    if(valid){
        if(valid.password == user.password){
            return true;
        }
    }
    return false;
  };
  users.register = function(user){
    if(users.list[user.username]){
        return false;
    }else{
        users.list[user.username] = {password: user.password};
        return true;
    }
  };
  users.del = function(index){
        delete users.list[index];
    };
  users.list = {
    'user1@a.a': {password: '1234', type: '1'},
    'user2@a.a': {password: '1234', type: '1'},
    'user3@a.a': {password: '1234', type: '1'},
    'user4@a.a': {password: '1234', type: '1'},
    'user5@a.a': {password: '1234', type: '2'}
  };
  return users;
});

appServices.factory('ProductSrv', function() {
  var products = {};
  products.get = function(index){
    return products.list[index];
  };
  products.getById = function(id){
    var product = null;
    products.list.forEach(function(item, index){
        if(item.id == id){
            product = item
        }
    });
    return product;
  };
  products.add = function(product){
      products.list.push(product);
  };
  products.update = function(index, product){
      products.list[index] = product;
  };
  products.del = function(index){
      products.list.splice(index);
  };
//  products.
  products.list = [
    {
        id: 1,
        name: 'Product A',
        price: 100,
        code: 'PA001',
        stock: 10,
        weight: 1,
        description: "This is product A",
        contact: '081-111-1111',
        status: 1,
        source: 'This product come from village A',
        reviews: [{
            username: 'Customer A',
            score: 3,
            info: 'This is product A quality'
        }, {
            username: 'Customer B',
            score: 5,
            info: 'Perfect'
        }]
    }, {
        id: 2,
        name: 'Product B',
        price: 50,
        code: 'PB001',
        stock: 100,
        weight: 2,
        description: "This is product B",
        contact: '081-111-1111',
        status: 1,
        source: 'This product come from village B'
    }, {
        id: 3,
        name: 'Product C',
        price: 200,
        code: 'PC001',
        stock: 5,
        weight: 3,
        description: "This is product C",
        contact: '081-111-1111',
        status: 1,
        source: 'This product come from village C'
    }, {
        id: 4,
        name: 'Product D',
        price: 150,
        code: 'PD001',
        stock: 3,
        weight: 1,
        description: "This is product D",
        contact: '081-111-1111',
        status: 2,
        source: 'This product come from village D'
    }, {
        id: 5,
        name: 'Product E',
        price: 199,
        code: 'PE001',
        stock: 20,
        weight: 1,
        description: "This is product E",
        contact: '081-111-1111',
        status: 1,
        source: 'This product come from village E'
    }, {
        id: 6,
        name: 'Product F',
        price: 30.5,
        code: 'PF001',
        stock: 34,
        weight: 1,
        description: "This is product F",
        contact: '081-111-1111',
        status: 1,
        source: 'This product come from village F'
    }
  ];
  return products;
});

appServices.factory('CartSrv', function($cookies) {
  var cart = {};
  cart.init = function(){
    $cookies.put('cart',JSON.stringify([]));
  };
  cart.update = function(){
      $cookies.put('cart',JSON.stringify(cart.order));
  };
  cart.clear = function(){
    $cookies.put('cart',JSON.stringify([]));
  };
  cart.add = function(product, amount){
    var notFound = true;
    cart.order.forEach(function(item, index){
        if(item.product.id == product.id){
            cart.order[index].amount += amount;
            notFound = false;
        }
    });
    if(notFound){
        var newProduct = {product: product, amount: amount};
        cart.order.push(newProduct);
    }
    cart.update();
  };
  cart.del = function(id){
    delete cart.order[id];
    cart.update();
  };
  if(!$cookies.get('cart')){
    cart.init();
  }
  cart.order = JSON.parse($cookies.get('cart'));
  return cart;
});

appServices.factory('OrderSrv', function() {
  var orders = {};
  orders.add = function(order){
    orders.list.push(order);
  };
  orders.del = function(id){
    delete order.list[id];
  };
  orders.update = function(index, order){
    orders.list[index] = order;
  };
  orders.updateById = function(order){
    orders.list.forEach(function(item, index){
        if(item.id == order.id){
            orders.list[index] = order;
        }
    });
  };
  orders.findByUser = function(username){
    var result = [];
    orders.list.forEach(function(item, index){
        if(item.user.username == username){
            result.push(item);
        }
    });
    return result;
  }
  orders.list = [

  ];
  return orders;
});

appServices.factory('PaymentSrv', function() {
  var payments = {};
  payments.add = function(payment){
    payments.list.push(payment);
  };
  payments.del = function(id){
    delete payments.list[id];
  };
  payments.list = [
  ];
  return payments;
});

/*Admin Service*/
appServices.factory('AdminSrv', function() {
     var admins = {};
     admins.validate = function(user){
       var valid = admins.list[user.username];
       if(valid){
           if(valid.password == user.password){
               return true;
           }
       }
       return false;
     };
     admins.register = function(user){
       if(admins.list[user.username]){
           return false;
       }else{
           admins.list[user.username] = {password: user.password};
           return true;
       }
     };
     admins.list = {
       'admin1@a.a': {password: '1234'},
       'admin2@a.a': {password: '1234'},
       'admin3@a.a': {password: '1234'},
       'admin4@a.a': {password: '1234'},
       'admin5@a.a': {password: '1234'}
     };
     return admins;
   });

/*Database*/
appServices.factory('DatabaseSrv', [function() {
    return admins;
}]);
//# sourceMappingURL=app.js.map
