/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvController', TvController);

    function TvController(TvService,$route,$routeParams){
        console.log("TvController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w300';
            vm.veriPosterImg = veriPosterImg;
            vm.searchTV = searchTV;

            TvService.findPopularTV(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.populartv = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.populartv[i].poster_path != null && vm.populartv[i].poster_path !== '')
                                vm.populartv[i].posterurl = vm.image_base_url + vm.poster_size + vm.populartv[i].poster_path;
                        }
                    }
                });

            TvService.findTopRateTV(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.topratetv = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.topratetv[i].poster_path != null && vm.topratetv[i].poster_path !== '')
                                vm.topratetv[i].posterurl = vm.image_base_url + vm.poster_size + vm.topratetv[i].poster_path;
                        }
                    }
                });
            TvService.findTvOnAir(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.onairtv = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.onairtv[i].poster_path != null && vm.onairtv[i].poster_path !== '')
                                vm.onairtv[i].posterurl = vm.image_base_url + vm.poster_size + vm.onairtv[i].poster_path;
                        }
                    }
                });
            TvService.findTvOnAirToday(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.airtodaytv = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.airtodaytv[i].poster_path != null && vm.airtodaytv[i].poster_path !== '')
                                vm.airtodaytv[i].posterurl = vm.image_base_url + vm.poster_size + vm.airtodaytv[i].poster_path;
                        }
                    }
                });
            if($routeParams.keyword!==undefined){
                vm.searchTV($routeParams.keyword,1);
            }

        }
        init();

        function searchTV(title,page){
            TvService.searchTVByTitle(title,page)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.searchtv = resp.results;
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.searchtv[i].poster_path != null && vm.searchtv[i].poster_path !== '')
                                vm.searchtv[i].posterurl = vm.image_base_url + vm.poster_size + vm.searchtv[i].poster_path;
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
