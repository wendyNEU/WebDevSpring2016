/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('ActorController', ActorController);

    function ActorController($scope,$location,$routeParams,ActorService){
        console.log("ActorController");
        $scope.actors = [];
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w500';
        ActorService.getAllActors()
            .then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found");
                } else if (resp.length === 0) {
                    alert("Item you are trying to search could not be found");
                    $location.path("/home");
                } else {
                    $scope.actors = resp.results;

                    for(i=0;i<resp.results.length;i++){
                        if(resp.results[i].profile_path!==null||resp.results[i].profile_path!==""){
                            $scope.actors[i].profile_path = image_base_url + poster_size + $scope.actors[i].profile_path;
                        }
                        /*
                        ActorService.getActorById(resp.results[i].id).then(function(resp) {
                            if (resp === undefined) {
                                alert("Item you are trying to search could not be found");
                                $location.path("/home");
                            } else {
                                console.log(resp);
                                $scope.actors[i].biography = resp.biography;
                            }
                        });
                        */
                    }
                    console.log($scope.actors);
                }
            });



        $scope.veriPosterImg = function(imageurl){
            if(imageurl===null){
                return './img/actor/nophtot.jpg';
            }else{
                return imageurl;
            }
        }
    }
})();
