(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);
    function MainController($scope,$rootScope){
        $rootScope.newUser = null;
        console.log("MainController");
    }
})();