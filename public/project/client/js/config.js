/**
 * Created by wendy on 4/3/16.
 */
(function () {
    var MovieFanApp = angular.module('MovieFanApp');
    MovieFanApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .when('/movie_list', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/movie_detail/:id', {
                    templateUrl: './views/moviedetail/moviedetail.view.html',
                    controller: 'MovieDetailController',
                    controllerAs: 'model'
                })
                .when('/tv_list', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/tv_detail/:id', {
                    templateUrl: './views/tvdetail/tvdetail.view.html',
                    controller: 'TvDetailController',
                    controllerAs: 'model'
                })
                .when('/actor_list',{
                    templateUrl:'./views/actorlist/actorlist.view.html',
                    controller: 'ActorController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/actor_detail/:id',{
                    templateUrl:'./views/actordetail/actordetail.view.html',
                    controller: 'ActorDetailController',
                    controllerAs: 'model'
                })
                .when('/register', {
                    templateUrl: './views/register/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when('/login', {
                    templateUrl: './views/login/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when('/admin',{
                    templateUrl: './views/admin/admin.view.html',
                    controller: 'UserController',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: './views/profile/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model'
                })
                .when('/logout', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }
    ]);
    MovieFanApp.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**',
            'http://image.tmdb.org/t/p/**',
            'http://api.themoviedb.org/3'
        ]);
    });
})();



