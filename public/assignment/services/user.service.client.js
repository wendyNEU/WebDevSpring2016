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
                for (var usr in cur_users) {
                    if (usr.username === username && usr.password === password) {
                        callback(usr);
                        return;
                    }
                }
                callback(null);
            },

            findAllUsers: function (callback) {
                for (var usr in cur_users) {
                    callback(usr);
                }
            },

            createUser: function (user, callback) {
                user._id = (new Date).getTime();
                cur_users.push(user);
                callback(user);
            },
            deleteUserById: function (userId, callback) {
                var i = 0;
                for (var usr in cur_users) {
                    if (userId._id === usr._id) {
                        cur_users.remove(i);
                        break;
                    }
                    i++;
                }
                callback(cur_usrs);
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

