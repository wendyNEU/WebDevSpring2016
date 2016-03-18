/**
 * Created by wendy on 3/15/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model'
                /*
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }*/
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController'
            })
            .when('/forms', {
                templateUrl: 'views/forms/forms.view.html',
                controller: 'FormController',
                controllerAs:'model',
                activetab:'forms'
            })
            .when('/form/:formId/fields',{
                templateUrl: 'views/forms/fields.view.html',
                controller: 'FieldController',
                controllerAs: 'model',
                activetab:'fields'
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs:'model'
            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/logout', {
                templateUrl: 'views/home/home.view.html',
                controller: 'HeaderController',
                controllersAs:'model'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

/*
    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var curUser = response.data;
                if(curUser) {
                    UserService.setCurrentUser(curUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
*/
    function getLoggedIn(UserService, $q) {
        UserService.getCurrentUser();
    }
})();