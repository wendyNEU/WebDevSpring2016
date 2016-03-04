/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieDetailController', MovieDetailController);

    function MovieDetailController($scope,$rootScope){
        console.log("MovieDetailController");
    }
})();
