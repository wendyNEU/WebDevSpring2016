/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', ['$scope', '$location','$rootScope','UserService',RegisterController]);

    function RegisterController($scope, $location, $rootScope, UserService){
        console.log("RegisterController");
        $scope.user = { "username":"", "password":"","veripassword":"","email":""};
        $scope.register = function(){
            var regis_user = {};
            regis_user.username = $scope.user.username;
            regis_user.password = $scope.user.password;
            regis_user.email = $scope.user.email;
            UserService.createUser(regis_user,function(usr){
                $rootScope.newUser._id = usr._id;
                $rootScope.newUser.username = usr.username;
                $rootScope.newUser.password = usr.password;
                $rootScope.newUser.roles = usr.roles;
            });
            console.log($rootScope.newUser);
            console.log($scope.user);
            $location.path('/profile');
        }
    }
})();