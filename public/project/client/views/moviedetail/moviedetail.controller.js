/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieDetailController',MovieDetailController);

    var youtubeVideoLinkBase = "https://www.youtube.com/embed/";

    function MovieDetailController($routeParams,MovieService){
        console.log("MovieDetailController");


        var vm = this;

        function init(){
            vm.getMovieById = getMovieById;
            vm.veriPosterImg = veriPosterImg;
            vm.getMovieById($routeParams.id);
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
        }

        init();

        function getMovieById(id){
            MovieService.getMovieById(id).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.movie = resp;
                    if(!(vm.movie.poster_path===undefined||vm.movie.poster_path===''))
                        vm.movie.posterurl = vm.image_base_url + vm.poster_size + vm.movie.poster_path;

                    MovieService.getMovieVideoById(vm.movie.id).then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else {
                            vm.movie.video = resp.results;
                            for(i=0;i<vm.movie.video.length;i++){
                                vm.movie.video[i].youtubeurl = youtubeVideoLinkBase + vm.movie.video[i].key;
                            }
                        }
                    });
                    console.log(vm.movie);
                }
            });
        }

        function getCommentSet(){

        }

        function addComment(){

        }

        function deleteComment(){

        }

        function isSelfComment(){

        }


        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './img/movie/noposter.jpg';
            }else{
                return imageurl;
            }
        }

    }
})();
