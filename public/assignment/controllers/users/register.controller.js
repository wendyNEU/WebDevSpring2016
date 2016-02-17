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
            var regis_user = {"firstname": "Di", "lastname": "Qiu", "username": $scope.user.username, "password": $scope.user.password};
            UserService.createUser(regis_user,function(usr){
                $rootScope.newUser = usr;
            });
            console.log($rootScope.newUser);
            console.log($scope.user);
            $location.path('/profile');
        }
    }
})();