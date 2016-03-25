/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location,UserService){
        console.log("RegisterController");
        var vm = this;

        function init(){
            vm.register = register;
            vm.user = { "username":"", "password":"","veripassword":"","email":""};
        }
        init();

        function register(){
            console.log(vm.user);
            UserService.createUser(vm.user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();