/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('TvDetailController', TvDetailController);

    function TvDetailController($scope,$rootScope){
        console.log("TvDetailController");
    }
})();