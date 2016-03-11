/**
 * Created by wendy on 3/4/16.
 */

(function() {
    angular.module("MovieFanApp")
        .factory("ActorService", ActorService);

    function ActorService($http, $q, $rootScope) {
        var base = 'http://api.themoviedb.org/3';
        var apiKey = 'a2ba7e66f0a9510643003d8fb4fae3f0';

        var api = {
            getAllActors : getAllActors,
            getActorById : getActorById
        };
        return api;

        function getAllActors(){
            var deferred = $q.defer();
            var service = '/person/popular';
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
        function getActorById(id){
            var deferred = $q.defer();
            var service = '/person/';
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

    }
})();

