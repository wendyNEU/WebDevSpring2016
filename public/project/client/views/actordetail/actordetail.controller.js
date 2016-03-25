/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('ActorDetailController', ActorDetailController);

    function ActorDetailController($scope,$routeParams,ActorService){
        console.log("ActorDetailController");
        var image_base_url = 'http://image.tmdb.org/t/p';
        var poster_size='/w300';
        ActorService.getActorById($routeParams.id).then(function(resp) {
            if (resp === undefined) {
                alert("Item you are trying to search could not be found");
                $location.path("/home");
            } else {
                $scope.actor = resp;
                console.log($scope.actor);
                if(!($scope.actor.profile_path===undefined||$scope.actor.profile_path===''))
                    $scope.actor.profile_path = image_base_url + poster_size + $scope.actor.profile_path;
            }
        });

        $scope.veriPosterImg = function(imageurl){
            if(imageurl===null){
                return './img/actor/Nophoto.jpg';
            }else{
                return imageurl;
            }
        }
    }
})();
