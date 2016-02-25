/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope,$rootScope){
        console.log("HeaderController");

        $scope.logout = function(){
            $rootScope.newUser = { "_id":0, "username": "", "password": "","roles":[]};
        },
        $scope.islogin = function(){
            return !($rootScope.newUser._id===0);
        },

        $scope.getUserName = function(){
            return $rootScope.newUser.username;
        }
    }
})();