
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