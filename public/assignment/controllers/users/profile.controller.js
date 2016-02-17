/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ['$scope','$rootScope','UserService',ProfileController]);

    function ProfileController($scope,$rootScope,UserService){
        console.log("ProfileController");
        $scope.user = {"firstname": "", "lastname": "", "username": "", "password": "","email":""};
        $scope.user.firstname="default";
        $scope.user.lastname="default";
        $scope.user.password = $rootScope.newUser.password;
        $scope.user.username = $rootScope.newUser.username;
        $scope.user.email = "default";
        $scope.update = function(){
            console.log($rootScope.newUser);
            var update_user = {"_id":0,"firstname": "", "lastname": "", "username": "", "password": ""};
            update_user.firstname = $scope.user.firstname;
            update_user.lastname = $scope.user.lastname;
            update_user.password = $scope.user.password;
            update_user.username = $scope.user.username;
            update_user._id = $rootScope._id;
            UserService.updateUser($rootScope.newUser._id,update_user,function(usr){
                $rootScope.newUser = usr;
            });
        }

    }
})();
