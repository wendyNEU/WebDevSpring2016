/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
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