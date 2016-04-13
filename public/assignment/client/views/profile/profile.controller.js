/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService,$q,$location){
        console.log("ProfileController");
        var vm = this;

        function init() {
            vm.loadCurUser = loadCurUser;
            vm.update = update;
            vm.addEmail = addEmail;
            vm.deleteEmail = deleteEmail;
            vm.addPhone = addPhone;
            vm.deletePhone = deletePhone;
            vm.user = { "username":"", "password":"","firstName":"","lastName":"","emails":[],"phones":[]};
            vm.email = "";
            vm.phone = "";
            vm.loadCurUser();
        }
        init();

        function loadCurUser(){
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

        function update(){
            var deferred = $q.defer();
            var updateUser = jQuery.extend({}, vm.user);
            if(updateUser.hasOwnProperty('_id')){
                delete updateUser._id;
            }
            UserService
                .updateUser(vm.user._id,updateUser)
                .then(function(response) {
                    if(response.status==200) {
                        vm.loadCurUser();
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
