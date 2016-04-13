/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, $q, UserService) {
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
            var deferred = $q.defer();
            UserService.logout()
                .then(function(response) {
                    if(response.status==200) {
                        deferred.resolve();
                        $location.url("/home");
                    } else {
                        deferred.reject();
                        alert("log out fail");
                    }
                });
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