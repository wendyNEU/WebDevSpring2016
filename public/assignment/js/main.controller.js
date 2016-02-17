(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);
    function MainController($scope,$rootScope){
        $rootScope.newUser = { "_id":123, "firstname": "", "lastname": "", "username": "", "password": ""};
        console.log("MainController");
    }
})();