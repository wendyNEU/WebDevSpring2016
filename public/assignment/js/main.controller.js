(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);
    function MainController($scope,$rootScope){
        $rootScope.newUser = { "_id":0, "firstname": "", "lastname": "", "username": "", "password": ""};
        console.log("MainController");
    }
})();