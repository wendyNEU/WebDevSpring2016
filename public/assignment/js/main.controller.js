(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);
    function MainController($scope){
        console.log("MainController");
    }
})();