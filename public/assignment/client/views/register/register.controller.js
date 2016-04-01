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
            vm.addEmail = addEmail;
            vm.deleteEmail = deleteEmail;
            vm.addPhone = addPhone;
            vm.deletePhone = deletePhone;
            vm.user = { "username":"", "password":"","emails":[],"phones":[]};
            vm.email = "";
            vm.phone = "";
        }
        init();

        function register(){
            UserService.createUser(vm.user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }

        function addEmail(){
            vm.user.emails.push(vm.email);
            vm.email = "";
        }

        function deleteEmail(index){
            vm.user.emails.splice(index,1);
        }

        function addPhone(){
            vm.user.phones.push(vm.phone);
            vm.phone="";
        }

        function deletePhone(index){
            vm.user.phones.splice(index,1);
        }
    }
})();