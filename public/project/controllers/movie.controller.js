/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieController', MovieController);

    function MovieController($scope, $location, $routeParams, MovieService){
        console.log("MovieController");
        $scope.movies = [];
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w500';
        MovieService.getAllMovies()
            .then(function(resp) {
            if (resp === undefined) {
                alert("Item you are trying to search could not be found");
            } else if (resp.length === 0) {
                alert("Item you are trying to search could not be found");
                $location.path("/home");
            } else {
                $scope.movies = resp.results;
                for(i=0;i<resp.results.length;i++){
                    if($scope.movies[i].poster_path!=null&&$scope.movies[i].poster_path!=='')
                        $scope.movies[i].posterurl = image_base_url + poster_size + $scope.movies[i].poster_path;
                }
                console.log($scope.movies);
            }
        });

        $scope.veriPosterImg = function(imageurl){
            if(imageurl===null||imageurl.length===0){
                return './img/movie/noposter.jpg';
            }else{
                return imageurl;
            }
        }
    }
})();