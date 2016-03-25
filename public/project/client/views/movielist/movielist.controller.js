/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieController', MovieController);

    function MovieController(MovieService,$route,$routeParams){
        console.log("MovieController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.veriPosterImg = veriPosterImg;
            vm.searchMovie = searchMovie;

            MovieService.findPopularMovie(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.popularmovie = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.popularmovie[i].poster_path != null && vm.popularmovie[i].poster_path !== '')
                                vm.popularmovie[i].posterurl = vm.image_base_url + vm.poster_size + vm.popularmovie[i].poster_path;
                        }
                    }
                });

            MovieService.findTopRateMovie(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.topratemovie = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.topratemovie[i].poster_path != null && vm.topratemovie[i].poster_path !== '')
                                vm.topratemovie[i].posterurl = vm.image_base_url + vm.poster_size + vm.topratemovie[i].poster_path;
                        }
                    }
                });
            MovieService.findMovieNowPlaying(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.nowmovie = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.nowmovie[i].poster_path != null && vm.nowmovie[i].poster_path !== '')
                                vm.nowmovie[i].posterurl = vm.image_base_url + vm.poster_size + vm.nowmovie[i].poster_path;
                        }
                    }
                });
            MovieService.findMovieUpcoming(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.upcomingmovie = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.upcomingmovie[i].poster_path != null && vm.upcomingmovie[i].poster_path !== '')
                                vm.upcomingmovie[i].posterurl = vm.image_base_url + vm.poster_size + vm.upcomingmovie[i].poster_path;
                        }
                    }
                });

            if($routeParams.keyword!==undefined){
                vm.searchMovie($routeParams.keyword,1);
            }

        }
        init();

        function searchMovie(title,page){
            MovieService.searchMoviesByTitle(title,page)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.searchmovie = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.searchmovie[i].poster_path != null && vm.searchmovie[i].poster_path !== '')
                                vm.searchmovie[i].posterurl = vm.image_base_url + vm.poster_size + vm.searchmovie[i].poster_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './img/noposter.png';
            }else{
                return imageurl;
            }
        }
    }
})();
