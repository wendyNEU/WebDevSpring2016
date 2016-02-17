/**
 * Created by wendy on 2/16/16.
 */
(function () {
    var FormBuilderApp = angular.module('FormBuilderApp', ['ngRoute']);
    FormBuilderApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/nav_side_home', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController'
                })
                .when('/nav_side_profile', {
                    templateUrl: './views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/nav_side_admin', {
                    templateUrl: './views/admin/admin.view.html',
                    controller: 'AdminController'
                })
                .when('/nav_side_forms', {
                    templateUrl: './views/forms/forms.view.html',
                    controller: 'FormController'
                })
                .when('/nav_register', {
                    templateUrl: './views/users/register.view.html',
                    controller: 'RegisterController'
                })
                .when('/nav_login', {
                    templateUrl: './views/users/login.view.html',
                    controller: 'LoginController'
                })
                .when('/nav_profile', {
                    templateUrl: './views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/nav_logout', {
                    templateUrl: './views/users/logout.view.html',
                    controller: 'LogoutController'
                })
        }]);
})();

