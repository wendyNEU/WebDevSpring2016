/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', ['$scope', '$location','$rootScope','UserService',RegisterController]);

    function RegisterController($scope, $location, $rootScope, UserService){
        console.log("RegisterController");
        $scope.register = function(){
            var user = { "firstName":"Di", "lastName":"Qiu","username":$scope.regis_username, "password":$scope.regis_pass};
            UserService.createUser(user,function(usr){
                $rootScope.newUser = usr;
            });
            $location.path('/profile');
        }
    }
})();