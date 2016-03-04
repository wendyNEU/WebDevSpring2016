/**
 * Created by wendy on 3/4/16.
 */
(function () {
    var MovieFanApp = angular.module('MovieFanApp');
    MovieFanApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: './views/home.html',
                    controller: 'HomeController'
                })
                .when('/new_list', {
                    templateUrl: './views/news_list.html',
                    controller: 'NewsController'
                })
                .when('/news_detail',{
                    templateUrl:'./views/news_detail.view.html',
                    controller: 'NewsDetailController'
                })
                .when('/movie_list', {
                    templateUrl: './views/movie_list.html',
                    controller: 'MovieController'
                })
                .when('/movie_detail', {
                    templateUrl: './views/movie_detail.html',
                    controller: 'MovieDetailController'
                })
                .when('/tv_list', {
                    templateUrl: './views/tv_list.html',
                    controller: 'TvController'
                })
                .when('/tv_detail', {
                    templateUrl: './views/tv_detail.html',
                    controller: 'TvDetailController'
                })
                .when('/actor_list',{
                    templateUrl:'./views/actor_list.html',
                    controller: 'ActorController'
                })
                .when('/actor_detail',{
                    templateUrl:'./views/actor_detail.view.html',
                    controller: 'ActorDetailController'
                })
                .when('/register', {
                    templateUrl: './views/register.view.html',
                    controller: 'RegisterController'
                })
                .when('/login', {
                    templateUrl: './views/login.view.html',
                    controller: 'LoginController'
                })
                .when('/profile', {
                    templateUrl: './views/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/logout', {
                    templateUrl: './views/home.html',
                    controller: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }]);
})();


