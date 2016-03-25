/**
 * Created by wendy on 3/4/16.
 */
(function() {
    angular
        .module('MovieFanApp')
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
            UserService.findUserByCredentials(vm.user.username, vm.user.password)
                .then(function (response) {
                    console.log(response.data);
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
