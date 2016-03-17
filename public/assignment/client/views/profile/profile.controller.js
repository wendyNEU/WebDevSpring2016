/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService,$q){
        console.log("ProfileController");
        var vm = this;

        function init() {
            var deferred = $q.defer();

            UserService
                .getProfile()
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        vm.user = curUser;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            vm.update = update;
        }
        init();

        function update(){
            var deferred = $q.defer();
            UserService
                .updateUser(vm.user._id,vm.user)
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        vm.user = curUser;
                        deferred.resolve();
                    } else {
                        alert("Update Profile Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

    }
})();
