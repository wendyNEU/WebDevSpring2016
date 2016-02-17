/**
 * Created by wendy on 2/16/16.
 */

(function () {
    var FormBuilderApp = angular.module('FormBuilderApp');
    FormBuilderApp.factory('UserService', UserService)

    function UserService() {
        var cur_users = [
            {"_id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice"},
            {"_id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob"},
            {"_id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password": "charlie"},
            {"_id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password": "dan"},
            {"_id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password": "ed"}
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
                for (var usr in cur_users) {
                    if (userId === usr._id) {
                        user._id = usr._id;
                        user.firstName = usr.firstName;
                        user.lastName = usr.lastName;
                        user.username = usr.username;
                        user.password = usr.password;
                        callback(user);
                        break;
                    }
                }
            }
        }
    }
})();

