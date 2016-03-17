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

            //deferred.promise;

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

        /*
        $scope.user = {};

        UserService.getUserById($rootScope.newUser._id,$scope.user,function(user,cur_user){
            user.firstname = cur_user.firstname;
            user.lastname = cur_user.lastname;
            user.email = cur_user.email;
            user.username = cur_user.username;
            user.password = cur_user.password;
        });

        $scope.update = function(){
            var update_user = {};
            update_user.firstname = $scope.user.firstname;
            update_user.lastname = $scope.user.lastname;
            update_user.password = $scope.user.password;
            update_user.username = $scope.user.username;
            update_user.email = $scope.user.email;
            $rootScope.newUser.username = $scope.user.username;
            $rootScope.newUser.password = $scope.user.password;
            UserService.updateUser($rootScope.newUser._id,update_user,function(update_user,user){
                if(user==null){
                    alert("login fail.")
                }else{
                    user.firstname = update_user.firstname;
                    user.lastname = update_user.lastname;
                    user.username = update_user.username;
                    user.password = update_user.password;
                    user.email = update_user.email;
                    $location.path('/profile');
                }
            });
        }*/

    }
})();
