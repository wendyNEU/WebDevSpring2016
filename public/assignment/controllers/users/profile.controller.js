/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ['$scope','$rootScope','$location','UserService',ProfileController]);

    function ProfileController($scope,$rootScope,$location,UserService){
        console.log("ProfileController");
        $scope.user = {"firstname": "", "lastname": "", "username": "", "password": "","email":""};
        $scope.user.firstname=$rootScope.newUser.firstname;
        $scope.user.lastname=$rootScope.newUser.lastname;
        $scope.user.password = $rootScope.newUser.password;
        $scope.user.username = $rootScope.newUser.username;
        $scope.user.email = "default";
        $scope.update = function(){
            var update_user = {"_id":0,"firstname": "", "lastname": "", "username": "", "password": ""};
            update_user.firstname = $scope.user.firstname;
            update_user.lastname = $scope.user.lastname;
            update_user.password = $scope.user.password;
            update_user.username = $scope.user.username;
            update_user._id = $rootScope._id;
            UserService.updateUser($rootScope.newUser._id,update_user,function(usr){
                if(usr==null){
                    alert("login fail.")
                }else{
                    $rootScope.newUser = usr;
                    $location.path('/profile');
                }
            });
        }

    }
})();
