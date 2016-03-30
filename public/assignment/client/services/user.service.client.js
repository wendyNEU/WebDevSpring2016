/**
 * Created by wendy on 2/16/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
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
            //more functions
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }

        //return userApi;

        function getProfile(){
            return $http.get("/api/assignment/user/"+$rootScope.curUser._id);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/"+userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId,user);
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
            if(islogin()&&$rootScope.curUser.rules!=undefined&&$rootScope.curUser.rules.indexOf("admin")!=-1){
                return true;
            }else{
                return false;
            }
        }

    }
})();

