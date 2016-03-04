/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieController', MovieController);

    function MovieController($scope,$rootScope){
        console.log("MovieController");
    }
})();