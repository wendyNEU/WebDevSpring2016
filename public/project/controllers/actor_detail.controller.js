/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('ActorDetailController', ActorDetailController);

    function ActorDetailController($scope,$rootScope){
        console.log("ActorDetailController");
    }
})();
