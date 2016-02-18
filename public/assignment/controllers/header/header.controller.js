/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope,$rootScope){
        console.log("HeaderController");
        $scope.user = {"username": "", "password": ""};
        $scope.user.username = $rootScope.newUser.username;
        $scope.user.password = $rootScope.newUser.password;

        $scope.logout = function(){
            $rootScope.newUser = { "_id":0, "firstname": "", "lastname": "", "username": "", "password": ""};
        },
        $scope.islogin = function(){
            console.log($scope.user);
            return !($rootScope.newUser._id===0);
        },

        $scope.getUserName = function(){
            $scope.user.username = $rootScope.newUser.username;
            return $scope.user.username;
        }
    }
})();