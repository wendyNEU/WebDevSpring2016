/**
 * Created by wendy on 3/4/16.
 */
(function () {
    angular
        .module('MovieFanApp')
        .controller('ActorController', ActorController);

    function ActorController(ActorService, $route,$routeParams) {
        console.log("ActorController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size = '/w185';
            vm.keyword = "";
            vm.Filters = [
                {"value":"popular","label":"Popular"},
                {"value":"search","label":"Search"}
            ];
            vm.selectedfilter = vm.Filters[0];
            vm.actorlist = [];
            vm.getPopular = getPopular;
            vm.veriPosterImg = veriPosterImg;
            vm.searchActor = searchActor;
            vm.changefilter = changefilter;
            vm.getPopular();
        }
        init();

        function getPopular(){
            ActorService.findPopularPerson(1)
                .then(function (resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.actorlist = resp.results;

                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.actorlist[i].profile_path != null && vm.actorlist[i].profile_path !== '')
                                vm.actorlist[i].profile_path = vm.image_base_url + vm.poster_size + vm.actorlist[i].profile_path;
                        }
                    }
                });
        }

        function searchActor(title, page) {
            ActorService.searchPersonByName(title, page)
                .then(function (resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.selectedfilter = vm.Filters[1];
                        vm.keyword = "";
                        vm.actorlist = resp.results;
                        for (var i = 0; i < resp.results.length; i++) {
                            if (vm.actorlist[i].profile_path != null && vm.actorlist[i].profile_path !== '')
                                vm.actorlist[i].profile_path = vm.image_base_url + vm.poster_size + vm.actorlist[i].profile_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl) {
            if (imageurl == undefined || imageurl === null) {
                return './images/Nophoto.jpg';
            } else {
                return imageurl;
            }
        }

        function changefilter(filtervalue){
            if(filtervalue.value=='popular'){
                vm.getPopular();
            }else{
                vm.searchMovie(vm.keyword,1);
            }
        }
    }

})();

