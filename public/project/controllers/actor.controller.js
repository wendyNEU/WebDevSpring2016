/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('ActorController', ActorController);

    function ActorController($scope,$rootScope){
        console.log("ActorController");
    }
})();
