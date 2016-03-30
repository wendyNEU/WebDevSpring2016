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
            vm.isLogin = isLogin;
            vm.getUserName = getUserName;
        }

        init();

        function logout() {
            UserService.logout();
            $location.url("/home");
        }

        function isLogin(){
            return UserService.islogin();
        }
        function getUserName(){
            var curUser = UserService.getCurrentUser();
            if(curUser==undefined||curUser==null||curUser.username==undefined){
                return '';
            }else{
                return curUser.username;
            }
        }
    }
})();