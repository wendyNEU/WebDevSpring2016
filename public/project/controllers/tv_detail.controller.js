/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvDetailController', TvDetailController);
    var youtubeVideoLinkBase = "https://www.youtube.com/embed/";

    function TvDetailController($scope,$rootScope,TvService,$routeParams){
        console.log("TvDetailController");
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w500';
        TvService.getTvById($routeParams.id).then(function(resp) {
            if (resp === undefined) {
                alert("Item you are trying to search could not be found");
            } else {
                $scope.tv = resp;
                if(!($scope.tv.poster_path===undefined||$scope.tv.poster_path===''))
                    $scope.tv.posterurl = image_base_url + poster_size + $scope.tv.poster_path;
                TvService.getTvVideoById($scope.tv.id).then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        console.log(resp);
                        $scope.tv.video = resp.results;
                        for (i = 0; i < $scope.tv.video.length; i++) {
                            $scope.tv.video[i].youtubeurl = youtubeVideoLinkBase + $scope.tv.video[i].key;
                        }
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