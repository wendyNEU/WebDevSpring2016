/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('NewsController', NewsController);

    function NewsController($scope,$rootScope){
        console.log("NewsController");
    }
})();