/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope,$rootScope,$location,UserService){
        console.log("ProfileController");
        $scope.user = {};

        UserService.getUserById($rootScope.curUser._id,$scope.user,function(user,cur_user){
            user.email = cur_user.email;
            user.username = cur_user.username;
            user.password = cur_user.password;
        });

        $scope.update = function(){
            var update_user = {};
            update_user.password = $scope.user.password;
            update_user.username = $scope.user.username;
            update_user.email = $scope.user.email;
            $rootScope.curUser.username = $scope.user.username;
            $rootScope.curUser.password = $scope.user.password;
            UserService.updateUser($rootScope.curUser._id,update_user,function(update_user,user){
                if(user==null){
                    alert("login fail.")
                }else{
                    user.username = update_user.username;
                    user.password = update_user.password;
                    user.email = update_user.email;
                    $location.path('/profile');
                }
            });
        }
    }
})();
