/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($scope,$rootScope){
        console.log("SidebarController");

        $scope.islogin = function(){
            return !($rootScope.newUser._id===0);
        }

        $scope.islogout = function(){
            return $rootScope.newUser._id===0;
        }

        $scope.isAdmin = function(){
            if($rootScope.newUser._id===0) return false;
            for(var i=0;i<$rootScope.newUser.roles.length;i++){
                if($rootScope.newUser.roles[i]==="admin") return true;
            }
            return false;
        }
    }
})();