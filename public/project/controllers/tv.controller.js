/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvController', TvController);

    function TvController($scope,$rootScope){
        console.log("TvController");
    }
})();
