/**
 * Created by wendy on 3/10/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('UserController', UserController);

    function UserController($scope,UserService){
        console.log("UserController");
        $scope.users = [];
        $scope.newUser = {"_id":0,"username": "", "password": "","roles": "", "email": "","photo":""};
        UserService.findAllUsers(function(users){
            $scope.users = users;
        });
        $scope.addUser = function(){
            UserService.createUser($scope.newUser,function(user){
                $scope.users.push(user);
                $scope.newUser = {"username": "", "password": "","roles": "", "email": "","photo":""};
            });
        }
        $scope.updateUser = function(){
            UserService.updateUser($scope.newUser._id,$scope.newUser,function(updateuser,olduser){
                $scope.newUser = {"_id":0,"username": "", "password": "","roles": "", "email": "","photo":""};
            });
        }
        $scope.deleteUser = function(index){
            $scope.users.splice(index,1);
            UserService.deleteUserById($scope.users[index]._id,function(users){
                $scope.newUser = {"_id":0,"username": "", "password": "","roles": "", "email": "","photo":""};
            });
        }
        $scope.selectUser = function(index){
            $scope.newUser._id = $scope.users[index]._id;
            $scope.newUser.username = $scope.users[index].username;
            $scope.newUser.password = $scope.users[index].password;
            $scope.newUser.roles = $scope.users[index].roles;
            $scope.newUser.email = $scope.users[index].email;
            $scope.newUser.photo = $scope.users[index].photo;
        }
    }
})();

