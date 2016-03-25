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
            vm.veriPosterImg = veriPosterImg;
            vm.searchActor = searchActor;

            ActorService.findPopularPerson(1)
                .then(function (resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.popularperson = resp.results;

                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.popularperson[i].profile_path != null && vm.popularperson[i].profile_path !== '')
                                vm.popularperson[i].profile_path = vm.image_base_url + vm.poster_size + vm.popularperson[i].profile_path;
                        }
                    }
                });
            if($routeParams.keyword!==undefined){
                vm.searchActor($routeParams.keyword,1);
            }

        }
        init();

        function searchActor(title, page) {
            ActorService.searchPersonByName(title, page)
                .then(function (resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");
                    } else {
                        vm.searchperson = resp.results;
                        console.log(vm.searchperson);
                        for (i = 0; i < resp.results.length; i++) {
                            if (vm.searchperson[i].profile_path != null && vm.searchperson[i].profile_path !== '')
                                vm.searchperson[i].profile_path = vm.image_base_url + vm.poster_size + vm.searchperson[i].profile_path;
                        }
                    }
                });
        }

        function veriPosterImg(imageurl) {
            if (imageurl == undefined || imageurl === null) {
                return './img/actor/Nophoto.jpg';
            } else {
                return imageurl;
            }
        }
    }

})();

