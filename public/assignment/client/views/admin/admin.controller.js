/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController(UserService,$q,$location){
        console.log("AdminController");
        vm = this;


        function init(){
            vm.newuser = {"username":"","password":"","rules":[]};
            vm.rule = "";
            vm.findAllUsers=findAllUsers;
            vm.createUser = createUser;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.deleteRule = deleteRule;
            vm.addRule = addRule;
            vm.arrayToString = arrayToString;
            vm.findAllUsers()
        }

        init();

        function findAllUsers(){
            var deferred = $q.defer();

            UserService
                .getProfile()
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        UserService
                            .adminFindAllUsers()
                            .then(function(response) {
                                if(response.data) {
                                    vm.users = response.data;
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                    alert("load users");
                                }
                            });
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            return deferred.promise;
        }

        function createUser(){
            var deferred = $q.defer();
            if(!(vm.newuser.rules instanceof Array))
                vm.newuser.rules =vm.newuser.rules.split('|');

            UserService
                .adminCreateUser(vm.newuser)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.newuser = {"username":"","password":"","rules":[]};
                        vm.rule = "";
                        vm.findAllUsers();
                        deferred.resolve();
                    } else {
                        alert("Create User Fail");
                        vm.findAllUsers();
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function updateUser(){
            var deferred = $q.defer();
            var updateUser = jQuery.extend({}, vm.newuser);
            if(updateUser.hasOwnProperty('_id')){
                delete updateUser._id;
            }

            UserService
                .adminUpdateUser(vm.newuser._id, updateUser)
                .then(function (response) {
                    if(response.status==200){
                        vm.newuser = {"username":"","password":"","rules":[]};
                        vm.rule = "";
                        vm.users = response.data;
                        deferred.resolve();
                    } else {
                        alert("Update Form Fail");
                        vm.findAllUsers();
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function deleteUser(index){
            var deferred = $q.defer();
            UserService.adminDeleteUserById(vm.users[index]._id)
                .then(function (response) {
                    if (response.status==200) {
                        vm.newuser = {"username":"","password":"","rules":[]};
                        vm.rule = "";
                        vm.users = response.data;
                        deferred.resolve();
                    } else {
                        alert("Delete Form Fail");
                        vm.findAllUsers();
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function selectUser(index){
            vm.newuser = jQuery.extend({}, vm.users[index]);
        }

        function arrayToString(arr){
            return arr.join("|");
        }

        function deleteRule(index){
            vm.newuser.rules.splice(index,1);
        }

        function addRule(){
            vm.newuser.rules.push(vm.rule);
            vm.rule="";
        }
    }
})();
