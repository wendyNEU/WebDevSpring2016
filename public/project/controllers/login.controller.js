/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('LoginController', LoginController);

    function LoginController($scope,$rootScope,$location,UserService){
        console.log("LoginController");
        $scope.user = {"username": "", "password": ""};
        if($rootScope.curUser!=null) {
            $scope.user.password = $rootScope.curUser.password;
            $scope.user.username = $rootScope.curUser.username;
        }

        $scope.login = function(){
            UserService.findUserByCredentials($scope.user.username,$scope.user.password,function(usr){
                if(usr==null){ alert("login fail");}
                else{
                    $rootScope.curUser._id = usr._id;
                    $rootScope.curUser.username = usr.username;
                    $rootScope.curUser.password = usr.password;
                    $rootScope.curUser.roles = usr.roles;
                    $location.path('/profile');
                }

            })
        }
    }
})();
