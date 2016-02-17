/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', ['$scope', '$location','UserService',RegisterController]);

    function RegisterController($scope, $location, UserService){
        console.log("RegisterController");
        $scope.register = function(UserService){
            var user = { "firstName":"Di", "lastName":"Qiu","username":$scope.regis_username, "password":$scope.regis_pass};
            UserService.createUser(user,function(usr){
                $rootScope.newUser = usr;
            });
            $location.path('./views/users/profile.view.html');
        }
    }
})();