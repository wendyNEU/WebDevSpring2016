/**
 * Created by wendy on 2/16/16.
 */
(function () {
    var FormBuilderApp = angular.module('FormBuilderApp');
    FormBuilderApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController'
                })
                .when('/profile', {
                    templateUrl: './views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/admin', {
                    templateUrl: './views/admin/admin.view.html',
                    controller: 'AdminController'
                })
                .when('/forms', {
                    templateUrl: './views/forms/forms.view.html',
                    controller: 'FormController'
                })
                .when('/register', {
                    templateUrl: './views/users/register.view.html',
                    controller: 'RegisterController'
                })
                .when('/login', {
                    templateUrl: './views/users/login.view.html',
                    controller: 'LoginController'
                })
                .when('/nav_profile', {
                    templateUrl: './views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/nav_logout', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HeaderController'
                })

        }]);
})();

