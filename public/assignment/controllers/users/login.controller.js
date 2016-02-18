/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('LoginController',['$scope','$rootScope','$location','UserService' ,LoginController]);

    function LoginController($scope,$rootScope,$location,UserService){
        console.log("LoginController");
        $scope.user = {"username": "", "password": ""};
        if($rootScope.newUser!=null) {
            $scope.user.password = $rootScope.newUser.password;
            $scope.user.username = $rootScope.newUser.username;
        }

        $scope.login = function(){
            UserService.findUserByUsernameAndPassword($scope.user.username,$scope.user.password,function(usr){
                if(usr==null){ alert("login fail");}
                else{
                    $rootScope.newUser= usr;
                    console.log($rootScope.newUser);
                    $location.path('/profile');
                }

            })
        }
    }
})();
