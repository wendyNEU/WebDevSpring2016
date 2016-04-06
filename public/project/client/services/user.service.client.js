/**
 * Created by wendy on 3/4/16.
 */

(function () {
    angular
        .module("MovieFanApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        return {
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserbyId: deleteUserById,
            updateUser: updateUser,
            getProfile:getProfile,
            islogin:islogin,
            isAdmin:isAdmin,
            like: like,
            unlike:unlike,
            //more functions
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }

        //return userApi;

        function getProfile(){
            return $http.get("/api/project/user/"+$rootScope.curUser._id);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/"+userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId,user);
        }

        function like(userId,type,tviso_id){
            return $http.post("/api/project/user/"+userId,{"tviso_id":tviso_id,"type":type});
        }

        function unlike(userId,type,tviso_id){
            return $http.delete("/api/project/user/"+userId+"/"+type+"/"+tviso_id);
        }

        function setCurrentUser(user) {
            $rootScope.curUser = user;
            $rootScope.$broadcast("setCurrentUser");
        }

        function getCurrentUser() {
            return $rootScope.curUser;
        }

        function logout() {
            return $rootScope.curUser = null;
        }

        function islogin(){
            if($rootScope.curUser==undefined||$rootScope.curUser==null){
                return false;
            }else{
                return true;
            }
        }

        function isAdmin(){
            if(islogin()&&$rootScope.curUser.rules=="admin"){
                return true;
            }else{
                return false;
            }
        }

    }
})();