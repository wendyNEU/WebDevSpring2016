/**
 * Created by wendy on 3/4/16.
 */
(function() {
    angular.module("MovieFanApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q, $rootScope) {
        var base = 'http://api.themoviedb.org/3';
        var apiKey = 'a2ba7e66f0a9510643003d8fb4fae3f0';

        var api = {
            getAllMovies : getAllMovies,
            getMovieById : getMovieById,
            getMovieVideoById : getMovieVideoById
        };
        return api;

        function getAllMovies(){
            var deferred = $q.defer();
            var service = '/movie/popular';
            var url = base + service + '?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
        function getMovieById(id){
            var deferred = $q.defer();
            var service = '/movie/';
            var url = base + service + id + '?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getMovieVideoById(id){
            var deferred = $q.defer();
            var service = '/movie/';
            var url = base + service + id + '/videos?api_key=' + apiKey;
            $http({method: 'GET', url: url}).
            success(function (response) {
                deferred.resolve(response);
            }).
            error(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();
