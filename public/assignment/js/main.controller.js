(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);
    function MainController($scope,$location,$rootScope){
        $scope.$location = $location;
        $rootScope.newUser = { "_id":0, "firstname": "", "lastname": "", "username": "", "password": "","roles":[]};
        console.log("MainController");
    }
})();