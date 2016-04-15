/**
 * Created by wendy on 3/4/16.
 */


(function(){
    angular
        .module('MovieFanApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService,$q){
        console.log("ProfileController");
        var vm = this;

        function init() {
            vm.uploadPhoto = '';
            var deferred = $q.defer();

            UserService
                .getProfile()
                .then(function(response) {
                    var curUser = response.data;
                    console.log(curUser);
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
            /*
            console.log(vm.uploadPhoto);
            if(vm.uploadPhoto!='') {
                if(vm.uploadPhoto.endsWith("png")){
                    vm.user.photo.contentType ='image/png';
                    vm.user.photo.data = fs.readFileSync(vm.uploadPhoto);
                }else if(vm.uploadPhoto.endsWith("jpg")){
                    vm.user.photo.contentType ='image/jpg';
                    vm.user.photo.data = fs.readFileSync(vm.uploadPhoto);
                }else if(vm.uploadPhoto.endsWith("jpeg")){
                    vm.user.photo.contentType ='image/jpeg';
                    vm.user.photo.data = fs.readFileSync(vm.uploadPhoto);
                }else{
                    alert("invalid image");
                }
            }*/
            var deferred = $q.defer();
            UserService
                .updateUser(vm.user._id,vm.user)
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        console.log('2');
                        console.log(curUser);
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