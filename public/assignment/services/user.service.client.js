/**
 * Created by wendy on 2/16/16.
 */

(function () {
    var FormBuilderApp = angular.module('FormBuilderApp');
    FormBuilderApp.factory('UserService', UserService)

    function UserService() {
        var cur_users = [
            {"_id": 123, "firstname": "Alice", "lastname": "Wonderland", "username": "alice", "password": "alice"},
            {"_id": 234, "firstname": "Bob", "lastname": "Hope", "username": "bob", "password": "bob"},
            {"_id": 345, "firstname": "Charlie", "lastname": "Brown", "username": "charlie", "password": "charlie"},
            {"_id": 456, "firstname": "Dan", "lastname": "Craig", "username": "dan", "password": "dan"},
            {"_id": 567, "firstname": "Edward", "lastname": "Norton", "username": "ed", "password": "ed"}
        ];
        return {
            findUserByUsernameAndPassword: function (username, password, callback) {
                var find = false;
                for(var i=0;i<cur_users.length;i++){
                    if (cur_users[i].username === username && cur_users[i].password === password) {
                        callback(cur_users[i]);
                        find = true;
                        break;
                    }
                }
                if(!find) callback(null);
            },

            findAllUsers: function (callback) {
                for(var i=0;i<cur_users.length;i++){
                    callback(cur_users[i]);
                }
            },

            createUser: function (user, callback) {
                user._id = (new Date).getTime();
                cur_users.push(user);
                callback(user);
            },
            deleteUserById: function (userId, callback) {
                for(var i=0;i<cur_users.length;i++) {
                    if (userId._id ===cur_users[i]._id){
                        cur_users.splice(i,1);
                    }
                }
                callback(cur_users);
            },
            updateUser: function (userId, user, callback) {
                for(var i=0;i<cur_users.length;i++){
                    if(userId===cur_users[i]._id){
                        cur_users.splice(i,1,user);
                        callback(user);
                        break;
                    }
                }
            }
        }
    }
})();

