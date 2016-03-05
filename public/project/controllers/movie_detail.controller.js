/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieDetailController',MovieDetailController);

    var youtubeVideoLinkBase = "https://www.youtube.com/embed/";

    function MovieDetailController($scope,$rootScope,$routeParams,MovieService){
        console.log("MovieDetailController");
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w500';
        MovieService.getMovieById($routeParams.id).then(function(resp) {
            if (resp === undefined) {
                alert("Item you are trying to search could not be found");
            } else {
                $scope.movie = resp;
                if(!($scope.movie.poster_path===undefined||$scope.movie.poster_path===''))
                    $scope.movie.posterurl = image_base_url + poster_size + $scope.movie.poster_path;
                //console.log($scope.movie);
                MovieService.getMovieVideoById($scope.movie.id).then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        $scope.movie.video = resp.results;
                        for(i=0;i<$scope.movie.video.length;i++){
                            $scope.movie.video[i].youtubeurl = youtubeVideoLinkBase + $scope.movie.video[i].key;
                        }
                        console.log($scope.movie.video);
                    }
                });
            }
        });
        $scope.veriPosterImg = function(imageurl){
            if(imageurl===null){
                return './img/movie/noposter.jpg';
            }else{
                return imageurl;
            }
        }
    }
})();
