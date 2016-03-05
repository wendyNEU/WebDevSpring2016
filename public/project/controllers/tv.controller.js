/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvController', TvController);

    function TvController($scope,$rootScope,TvService){
        console.log("TvController");
        $scope.tvs = [];
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w500';
        TvService.getAllTvs()
            .then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else if (resp.length === 0) {
                    alert("Item you are trying to search could not be found");
                    $location.path("/home");
                } else {
                    $scope.tvs = resp.results;
                    for(i=0;i<resp.results.length;i++){
                        if($scope.tvs[i].poster_path!=null&&$scope.tvs[i].poster_path!=='')
                            $scope.tvs[i].posterurl = image_base_url + poster_size + $scope.tvs[i].poster_path;
                    }
                    console.log($scope.tvs);
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
