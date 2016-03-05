/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope,$rootScope,$location,UserService){
        console.log("RegisterController");
        $scope.user = { "username":"", "password":"","veripassword":"","email":""};
        $scope.register = function(){
            var regis_user = {};
            regis_user.username = $scope.user.username;
            regis_user.password = $scope.user.password;
            regis_user.email = $scope.user.email;
            UserService.createUser(regis_user,function(usr){
                $rootScope.curUser._id = usr._id;
                $rootScope.curUser.username = usr.username;
                $rootScope.curUser.password = usr.password;
                $rootScope.curUser.roles = usr.roles;
            });
            $location.path('/profile');
        }
    }
})();
