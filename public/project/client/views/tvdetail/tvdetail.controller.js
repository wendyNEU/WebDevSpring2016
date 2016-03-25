/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvDetailController',TvDetailController);

    var youtubeVideoLinkBase = "https://www.youtube.com/embed/";

    function TvDetailController($routeParams,TvService){
        console.log("TvDetailController");


        var vm = this;

        function init(){
            vm.getTvById = getTvById;
            vm.veriPosterImg = veriPosterImg;
            vm.getTvById($routeParams.id);
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
        }

        init();

        function getTvById(id){
            TvService.getTvById(id).then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else {
                    vm.tv = resp;
                    if(!(vm.tv.poster_path===undefined||vm.tv.poster_path===''))
                        vm.tv.posterurl = vm.image_base_url + vm.poster_size + vm.tv.poster_path;

                    TvService.getTvVideoById(vm.tv.id).then(function(resp) {
                        if (resp === undefined) {
                            alert("Item you are trying to search could not be found");
                        } else {
                            vm.tv.video = resp.results;
                            for(i=0;i<vm.tv.video.length;i++){
                                vm.tv.video[i].youtubeurl = youtubeVideoLinkBase + vm.tv.video[i].key;
                            }
                        }
                    });
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
