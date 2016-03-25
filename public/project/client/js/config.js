/**
 * Created by wendy on 3/4/16.
 */
(function () {
    var MovieFanApp = angular.module('MovieFanApp');
    MovieFanApp.config(['$routeProvider',
        function ($routeProvider,$rootParams) {
            $routeProvider
                .when('/home', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .when('/movie_list/popular', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/movie_list/toprate', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'toprate'
                })
                .when('/movie_list/nowplaying', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'nowplaying'
                })
                .when('/movie_list/upcoming', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'upcoming'
                })
                .when('/movie_list/search/:keyword', {
                    templateUrl: './views/movielist/movielist.view.html',
                    controller: 'MovieController',
                    controllerAs: 'model',
                    activetab:'search'
                })
                .when('/movie_detail/:id', {
                    templateUrl: './views/moviedetail/moviedetail.view.html',
                    controller: 'MovieDetailController',
                    controllerAs: 'model'
                })
                .when('/tv_list/popular', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/tv_list/toprate', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'toprate'
                })
                .when('/tv_list/onair', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'onair'
                })
                .when('/tv_list/airtoday', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'airtoday'
                })
                .when('/tv_list/search/:keyword', {
                    templateUrl: './views/tvlist/tvlist.view.html',
                    controller: 'TvController',
                    controllerAs: 'model',
                    activetab:'search'
                })
                .when('/tv_detail/:id', {
                    templateUrl: './views/tvdetail/tvdetail.view.html',
                    controller: 'TvDetailController',
                    controllerAs: 'model'
                })
                .when('/actor_list/popular',{
                    templateUrl:'./views/actorlist/actorlist.view.html',
                    controller: 'ActorController',
                    controllerAs: 'model',
                    activetab:'popular'
                })
                .when('/actor_list/search/:keyword',{
                    templateUrl:'./views/actorlist/actorlist.view.html',
                    controller: 'ActorController',
                    controllerAs: 'model',
                    activetab:'search'
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


