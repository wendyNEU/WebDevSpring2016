/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($scope,UserService){
        console.log("SidebarController");


        $scope.islogin = function(){
            return UserService.islogin();
        }

        $scope.islogout = function(){
            return !UserService.islogin();
        }

        $scope.isAdmin = function(){
            return UserService.isAdmin();
        }
    }
})();