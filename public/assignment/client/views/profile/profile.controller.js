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
            vm.update = update;
            vm.addEmail = addEmail;
            vm.deleteEmail = deleteEmail;
            vm.addPhone = addPhone;
            vm.deletePhone = deletePhone;
            vm.user = { "username":"", "password":"","firstName":"","lastName":"","emails":[],"phones":[]};
            vm.email = "";
            vm.phone = "";

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
