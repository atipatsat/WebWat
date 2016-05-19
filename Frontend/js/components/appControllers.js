/* Controllers */
var appControllers = angular.module('appControllers', []);
/*Home Controllers*/
appControllers.controller('HomeCtrl', ['$scope', '$location', '$cookies', 'ProductSrv', 'CartSrv', 'ngNotify',
    function($scope, $location, $cookies, productSrv, cartSrv, ngNotify) {
        var self = this;
        $scope.products = null;
        $scope.wholesalePrice = function(price){
            return Math.round((parseInt(price) * 0.1) * 100) / 100
        }
        $scope.loadProducts = function(res) {
            if (res.status == 200) {
                $scope.products = res.data;
            }
        }
        $scope.addToCart = function(product) {
            if ($cookies.get('auth') ? true : false) {
                cartSrv.add(product, 1);
                ngNotify.set("New Item Added.", 'success');
            } else {
                $location.path('/login/');
            }
        };
        $scope.isWholesale = function() {
            var raw = $cookies.get('user');
            if(raw){
                var user = JSON.parse(raw);
                if (user) {
                    if (user.type == 2) {
                        return true;
                    }
                }
            }
            return false;
        };
        productSrv.fetch($scope.loadProducts);
    }
]);
appControllers.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'UserSrv',
    function($scope, $rootScope, $location, $cookies, userSrv) {
        var self = this;
        $scope.user = {};
        $scope.isInValid = false;
        $scope.validate = function(user) {
            userSrv.validate(user, $scope.attempt);
        };
        $scope.attempt = function(res) {
            if (res.data) {
                console.log(res.data);
                $cookies.put('auth', true);
                $cookies.put('user', JSON.stringify(res.data));
                $rootScope.$broadcast('isUser');
                $location.path('/product');
                $location.replace();
            } else {
                $scope.isInValid = true;
            }
        }
    }
]);
appControllers.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'UserSrv',
    function($scope, $rootScope, $location, $cookies, $http, userSrv) {
        var self = this;
        $scope.user = {
            email: "",
            password: "",
            type: 1
        };
        $scope.isInValid = false;
        $scope.validate = function(user) {
            userSrv.register(user, $scope.attempt);
        };
        $scope.attempt = function(res) {
            if (res.data) {
                $cookies.put('auth', true);
                $cookies.put('user', JSON.stringify(res.data));
                $rootScope.$broadcast('isUser');
                $location.path('/product');
                $location.replace();
            } else {
                $scope.isInValid = true;
            }
        };
    }
]);
appControllers.controller('DetailCtrl', ['$scope', '$routeParams', 'ProductSrv',
    function($scope, $routeParams, productSrv) {
        var self = this;
        $scope.product = productSrv.getById($routeParams.id);
    }
]);
appControllers.controller('ReviewCtrl', ['$scope', '$routeParams', '$location', '$cookies', 'ProductSrv', 'ngNotify',
    function($scope, $routeParams, $location, $cookies, productSrv, ngNotify) {
        var self = this;
        var raw = $cookies.get('user');
        var path = '/product/' + $routeParams.id;

        if(!raw){$location.path(path);}
        else{
            var user = JSON.parse(raw);
            if(!user){
                $location.path(path);
            }
        }
        $scope.product = productSrv.getById($routeParams.id);
        $scope.save = function(review) {
            review.email = JSON.parse($cookies.get('user')).email;
            productSrv.list[$routeParams.id - 1].reviews.push(review);
            ngNotify.set("New review added.");
            $location.path(path);
        }
    }
]);
/*Admin Controllers*/
appControllers.controller('AdminCtrl', ['$scope', 'OrderSrv', 'PaymentSrv',
    function($scope, orderSrv, paymentSrv) {
        $scope.orders = orderSrv.list;
        $scope.payments = paymentSrv.list;
    }
]);
appControllers.controller('AdminLoginCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'AdminSrv',
    function($scope, $rootScope, $location, $cookies, $http, userSrv) {
        var self = this;
        $scope.user = {};
        $scope.isInValid = false;
        // $scope.validate = function(user) {
        //     if (userSrv.validate(user)) {
        //         $cookies.put('admin', true);
        //         $rootScope.$broadcast('isAdmin');
        //         $location.path('/product');
        //         $location.replace();
        //     } else {
        //         $scope.isInValid = true;
        //     }
        // };
        $scope.validate = function(user) {
            userSrv.validate(user, $scope.attempt);
        };
        $scope.attempt = function(res) {
            if (res.data) {
                $cookies.put('admin', true);
                $rootScope.$broadcast('isAdmin');
                $location.path('/product');
                $location.replace();
            } else {
                $scope.isInValid = true;
            }
        }
    }
]);
appControllers.controller('AdminMembersCtrl', ['$scope', '$location', 'UserSrv',
    function($scope, $location, userSrv) {
        $scope.members = userSrv.list;
        $scope.delete = function(index) {
            userSrv.del(index);
        }
    }
]);
appControllers.controller('AdminProductsCtrl', ['$scope', '$location', 'ProductSrv', 'ngNotify',
    function($scope, $location, productSrv, ngNotify) {
        $scope.products = null;
        $scope.loadProducts = function(res) {
            if (res.status == 200) {
                $scope.products = res.data;
            }
        }
        $scope.edit = function(product) {
            var path = '#/admin/products/edit/' + product.id + '/';
            $location.path(path);
        }
        $scope.delete = function(product) {
            productSrv.del(product, $scope.successDelete);
        }
        $scope.successDelete = function(req){
            if(req.data)
                ngNotify.set("Item deleted.","success");
            productSrv.fetch($scope.loadProducts);
        }
        productSrv.fetch($scope.loadProducts);
    }
]);
appControllers.controller('AdminProductCreateCtrl', ['$scope', '$routeParams', 'ProductSrv', 'ngNotify',
    function($scope, $routeParams, productSrv, ngNotify) {
        $scope.product = {
            id: 0,
            name: '',
            price: 0,
            code: '',
            stock: 0
        }
        if ($routeParams.id) {
            $scope.product = productSrv.get($routeParams.id);
        }
        
        $scope.add = function(product) {
            productSrv.add(product, $scope.save);
        };
        $scope.save = function(req) {
            if (!req.data) {
                return ngNotify.set('There is an data missing. Please check.', 'error');
            }
            // product.id = productSrv.list.length + 1;
            // productSrv.add(product);
            return ngNotify.set('Product updated.', 'success');
        };
    }
]);
appControllers.controller('AdminProductEditCtrl', ['$scope', '$routeParams', '$location', 'ProductSrv', 'ngNotify',
    function($scope, $routeParams, $location, productSrv, ngNotify) {
        $scope.product = {
            id: 0,
            name: '',
            price: 0,
            code: '',
            stock: 0
        }
        if ($routeParams.id != '') {
            $scope.product = productSrv.get($routeParams.id);
        }
        // $scope.validate = function(product) {
        //     if (product.name == '') {
        //         return false;
        //     } else if (product.price == 0) {
        //         return false;
        //     } else if (product.code == '') {
        //         return false;
        //     } else if (product.stock == 0) {
        //         return false;
        //     } else return true;
        // };
        // $scope.save = function(product) {
        //     if (!$scope.validate(product)) {
        //         return ngNotify.set('There is an data missing. Please check.', 'error');
        //     }
        //     productSrv.update($routeParams.id, product);
        //     return ngNotify.set('New product added.', 'success');
        // };

        $scope.add = function(product) {
            productSrv.add(product, $scope.save);
        };
        $scope.save = function(req) {
            if (!req.data) {
                return ngNotify.set('There is an data missing. Please check.', 'error');
            }
            // product.id = productSrv.list.length + 1;
            // productSrv.add(product);
            return ngNotify.set('Product updated.', 'success');
        };
    }
]);
appControllers.controller('AdminOrderCtrl', ['$scope', '$routeParams', 'OrderSrv', 'ngNotify',
    function($scope, $routeParams, orderSrv, ngNotify) {
        $scope.order = orderSrv.list[$routeParams.id];
        $scope.transportFee = ($scope.order.transport == 2) ? 800 : 0;
        $scope.order.total = parseInt($scope.order.price) + parseInt($scope.transportFee) + parseInt($scope.order.weight);
        $scope.updateTotal = function() {
            $scope.order.total = parseInt($scope.order.price) + parseInt($scope.transportFee) + parseInt($scope.order.weight);
        }
        $scope.save = function() {
            $scope.order.fee = $scope.transportFee;
            ngNotify.set('Order updated.', 'success');
            orderSrv.update($routeParams.id, $scope.order);
        };
    }
]);
appControllers.controller('AdminOrdersCtrl', ['$scope', 'OrderSrv',
    function($scope, orderSrv) {
        $scope.orders = orderSrv.list;
    }
]);
appControllers.controller('AdminPaymentsCtrl', ['$scope', 'PaymentSrv',
    function($scope, paymentSrv) {
        $scope.payments = paymentSrv.list
    }
]);
appControllers.controller('AdminCheckCtrl', ['$scope', '$cookies', '$routeParams', 'PaymentSrv',
    function($scope, $cookies, $routeParams, paymentSrv) {
        $scope.payment = paymentSrv.list[$routeParams.id]
        $scope.print = function(payment) {
            $cookies.put('payment', JSON.stringify(payment));
            var win = window.open('/partials/admin/print.html', '_blank');
            if (win) {
                win.focus();
            } else {
                alert('Please allow popups for this site');
            }
        }
    }
]);
/*User Controllers*/
appControllers.controller('CartCtrl', ['$scope', '$cookies', '$timeout', '$location', 'CartSrv', 'OrderSrv', 'ngNotify',
    function($scope, $cookies, $timeout, $location, cartSrv, orderSrv, ngNotify) {
        $scope.order = {
            id: 0,
            label: '',
            address: '',
            transport: 2,
            status: 1,
            fee: 0,
            price: 0,
            total: 0,
            weight: 0,
            user: {},
            items: []
        };
        $scope.items = cartSrv.update();
        $scope.delete = function(id) {
            cartSrv.del(id);
            $scope.items = cartSrv.order;
        };
        $scope.placeOrder = function(order) {
            console.log('Here');
            order.id = orderSrv.list.length + 1;
            order.items = $scope.items;
            order.items.forEach(function(item, index) {
                order.weight += item.product.weight * item.amount;
                order.price += item.product.price * item.amount;
            });
            order.user = JSON.parse($cookies.get('user'));
            order.label = 'WPS0' + orderSrv.list.length;
            orderSrv.add(order, null);
            cartSrv.clear();
            $scope.items = cartSrv.update();
            ngNotify.set('New order placed. Please wait for admin to approve.', 'success');
            $timeout(function() {
                $cookies.put('order', JSON.stringify(order));
                $location.path('/orders');
            }, 2000);
        };
        $scope.isEnough = function() {
            var totalAmount = 0;
            $scope.items.forEach(function(item, index) {
                totalAmount += item.amount;
            });
            if (totalAmount > 20) return false;
            else return true;
        };
    }
]);
appControllers.controller('ConfirmCtrl', ['$scope', '$cookies', '$location',
    function($scope, $cookies, $location) {
        $scope.payment = {
            order: null,
            method: 0
        };
        $scope.order = JSON.parse($cookies.get('order'));
        $scope.pay = function(order) {
            $cookies.put('order', JSON.stringify(order));
            $location.path('/payment/normal');
        };
    }
]);
appControllers.controller('PaymentCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'OrderSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, orderSrv, ngNotify) {
        $scope.payment = {
            id: 0,
            order: null,
            proof: '',
            method: 0,
            status: 'Pending'
        };
        $scope.order = JSON.parse($cookies.get('order'));
        $scope.pay = function(payment) {
            $scope.order.status = 4;
            orderSrv.updateById($scope.order);
            payment.order = $scope.order;
            payment.method = 1;
            payment.status = 'Paid';
            ngNotify.set('Thanks for purchase at us.', 'success');
            paymentSrv.add(payment);
            //        $location.path('/summary');
        };
    }
]);
appControllers.controller('PaypalCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, ngNotify) {
        $scope.payment = {
            order: null,
            proof: '',
            method: 0
        };
        $scope.order = JSON.parse($cookies.get('order'));
        $scope.pay = function(payment) {
            ngNotify.set('Save payment', 'success');
            paymentSrv.add(payment);
        };
    }
]);
appControllers.controller('SummaryCtrl', ['$scope', '$cookies', '$location', 'PaymentSrv', 'ngNotify',
    function($scope, $cookies, $location, paymentSrv, ngNotify) {
        $scope.payment = {
            order: null,
            proof: '',
            method: 0
        };
        $scope.order = JSON.parse($cookies.get('order'));
        $scope.pay = function(payment) {
            ngNotify.set('Save payment', 'success');
            paymentSrv.add(payment);
        };
    }
]);
appControllers.controller('OrdersCtrl', ['$scope', '$cookies', '$location', 'OrderSrv',
    function($scope, $cookies, $location, orderSrv) {
        var user = JSON.parse($cookies.get('user'));
        $scope.orders = orderSrv.findByUser(user.email);
        $scope.pay = function(order) {
            $cookies.put('order', JSON.stringify(order));
            $location.path('/payment');
        };
    }
]);
/*Shared Controllers*/
appControllers.controller('HeaderCtrl', ['$scope', '$cookies',
    function($scope, $cookies) {
        $scope.isRetail = function(){
            var raw = $cookies.get('user');
            if(raw){
                var user = JSON.parse(raw);
                if(user.type == 1){
                    return true;
                }
            }
        };
        $scope.isWholesale = function(){
            var raw = $cookies.get('user');
            if(raw){
                var user = JSON.parse(raw);
                if(user.type == 2){
                    return true;
                }
            }
        };
    }
]);
appControllers.controller('FooterCtrl', ['$scope',
    function($scope) {
        var self = this;
        self.texts = ['A', 'B', 'C'];
        //    $scope.texts = ['A','B','C'];
    }
]);
appControllers.controller('SideMenuCtrl', ['$scope', '$cookies', '$location',
    function($scope, $cookies, $location) {
        var self = this;
        self.texts = ['A', 'B', 'C'];
        $scope.$on('isAdmin', function(event, msg) {
            self.updateIsAdmin();
        });
        $scope.$on('isUser', function(event, msg) {
            self.updateIsUser();
        });
        self.isAdmin = $cookies.get('admin') ? true : false;
        self.isUser = $cookies.get('auth') ? true : false;
        self.updateIsAdmin = function() {
            self.isAdmin = $cookies.get('admin') ? true : false;
        };
        self.updateIsUser = function() {
            self.isUser = $cookies.get('auth') ? true : false;
        };
        self.logout = function() {
            // console.log("test");
            $cookies.remove('auth');
            $cookies.remove('admin');
            $cookies.remove('order');
            $cookies.remove('user');
            self.updateIsAdmin();
            self.updateIsUser();
            $location.path('/#/');
        };
    }
]);