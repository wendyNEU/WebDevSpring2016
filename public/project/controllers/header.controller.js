/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope,$rootScope){
        console.log("HeaderController");
    }
})();
