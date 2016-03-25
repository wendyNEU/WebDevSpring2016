/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('NewsDetailController', NewsDetailController);

    function NewsDetailController($scope,$rootScope){
        console.log("NewsDetailController");
    }
})();