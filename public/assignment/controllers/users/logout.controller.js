/**
 * Created by wendy on 2/16/16.
 */

(function(){
    angular
        .module('FormBuilderApp')
        .controller('LogoutController', LogoutController);

    function LogoutController($scope){
        console.log("LogoutController");
    }
})();