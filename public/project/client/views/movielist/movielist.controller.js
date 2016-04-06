/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieController', MovieController);

    function MovieController(MovieService,$route,$location){
        console.log("MovieController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.$location = $location;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.keyword = "";
            vm.veriPosterImg = veriPosterImg;
            vm.getPopular = getPopular;
            vm.getTopRate = getTopRate;
            vm.getNowPlaying = getNowPlaying;
            vm.getUpcoming = getUpcoming;
            vm.searchMovie = searchMovie;
            vm.changefilter = changefilter;
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"toprate","label":"Top Rate"},
                {"value":"nowplaying","label":"Now Playing"},
                {"value":"upcoming","label":"Upcoming"},
                {"value":"search","label":"Search"}
            ];
            vm.selectedfilter = vm.Filters[0];
            vm.movielist = [];
            vm.getPopular();
        }
        init();

        function getPopular(){
            MovieService.findPopularMovie(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getTopRate(){
            MovieService.findTopRateMovie(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getNowPlaying(){
            MovieService.findMovieNowPlaying(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function getUpcoming() {
            MovieService.findMovieUpcoming(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }


        function searchMovie(title,page){
            MovieService.searchMoviesByTitle(title,page)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.selectedfilter = vm.Filters[4];
                        vm.keyword="";
                        vm.movielist = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
                                vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './images/noposter.png';
            }else{
                return imageurl;
            }
        }

        function changefilter(filtervalue){
            if(filtervalue.value=='popular'){
                vm.getPopular();
            }else if(filtervalue.value=='toprate'){
                vm.getTopRate();
            }else if(filtervalue.value=='nowplaying'){
                vm.getNowPlaying();
            }else if(filtervalue.value=='upcoming'){
                vm.getUpcoming();
            }else{
                vm.searchMovie(vm.keyword,1);
            }
        }

    }
})();
