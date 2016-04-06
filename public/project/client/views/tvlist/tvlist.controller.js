/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvController', TvController);

    function TvController(TvService,$route){
        console.log("TvController");
        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w300';
            vm.keyword = "";
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"toprate","label":"Top Rate"},
                {"value":"onair","label":"On Air"},
                {"value":"airtoday","label":"Air Today"},
                {"value":"search","label":"Search"}
            ];
            vm.selectedfilter = vm.Filters[0];
            vm.tvlist = [];
            vm.getPopular = getPopular;
            vm.getTopRate = getTopRate;
            vm.getAirToday = getAirToday;
            vm.getOnAir = getOnAir;
            vm.veriPosterImg = veriPosterImg;
            vm.searchTV = searchTV;
            vm.changefilter = changefilter;

            vm.getPopular();
        }
        init();

        function getPopular(){
            TvService.findPopularTV(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }

        function getTopRate(){
            TvService.findTopRateTV(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }

        function getOnAir(){
            TvService.findTvOnAir(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }

        function getAirToday(){
            TvService.findTvOnAirToday(1)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
                        }
                    }
                });
        }
        function searchTV(title,page){
            TvService.searchTVByTitle(title,page)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.selectedfilter = vm.Filters[4];
                        vm.keyword = "";
                        vm.tvlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.tvlist[i].poster_path != null && vm.tvlist[i].poster_path !== '')
                                vm.tvlist[i].posterurl = vm.image_base_url + vm.poster_size + vm.tvlist[i].poster_path;
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
            }else if(filtervalue.value=='onair'){
                vm.getOnAir();
            }else if(filtervalue.value=='airtoday'){
                vm.getAirToday();
            }else{
                vm.searchTV(vm.keyword,1);
            }
        }
    }
})();
