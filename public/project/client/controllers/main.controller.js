/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MainController', MainController);
    function MainController($scope,$location,$rootScope){
        console.log("MainController");
        $rootScope.curUser = { "_id":0, "username": "", "password": "","roles":[]};
    }
})();
