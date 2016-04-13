/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {
        console.log("LoginController");
        var vm = this;

        function init() {
            vm.login = login;
            vm.user = {"username": "", "password": ""};
        }

        init();

        function login() {

            if (!vm.user) return;
            console.log("start login");
            UserService.login({"username":vm.user.username,"password":vm.user.password})
                .then(function (response) {
                    if (response.data == null) {
                        alert("login fail");
                    }
                    else {
                        vm.user = response.data;
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                })
        }
    }
})();
