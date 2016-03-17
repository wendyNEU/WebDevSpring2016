/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, UserService) {
        console.log("HeaderController");

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.logout = logout;
        }

        init();

        function logout() {
            UserService.logout();
            $location.url("/home");
        }
    }
})();