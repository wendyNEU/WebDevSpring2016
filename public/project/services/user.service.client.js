/**
 * Created by wendy on 3/4/16.
 */


(function () {
    var FormBuilderApp = angular.module('FormBuilderApp');
    FormBuilderApp.factory('UserService', UserService)

    function UserService() {
        var cur_users = [
            {
                "_id": 123, "username": "alice", "password": "alice", "roles": ["student"], "email": "alice@gmail.com","photo":""
            },
            {
                "_id": 234, "username": "bob", "password": "bob", "roles": ["admin"], "email": "bob@gmail.com","photo":""
            },
            {
                "_id": 345, "username": "charlie", "password": "charlie", "roles": ["faculty"], "email": "charlie@gmail.com","photo":""
            }
        ];
        return {
            findUserByCredentials: function (username, password, callback) {
                var find = false;
                for (var i in cur_users) {
                    if (cur_users[i].username === username && cur_users[i].password === password) {
                        callback(cur_users[i]);
                        find = true;
                        break;
                    }
                }
                if (!find) callback(null);
            },

            findAllUsers: function (callback) {
                for (var i in cur_users) {
                    callback(cur_users[i]);
                }
            },

            createUser: function (user, callback) {
                user._id = (new Date).getTime();
                user.roles=["student"];
                cur_users.push(user);
                callback(user);
            },
            deleteUserById: function (userId, callback) {
                for (var i in cur_users) {
                    if (userId._id === cur_users[i]._id) {
                        cur_users.splice(i, 1);
                    }
                }
                callback(cur_users);
            },
            updateUser: function (userId, user, callback) {
                for (var i in cur_users) {
                    if (userId === cur_users[i]._id) {
                        callback(user,cur_users[i]);
                        cur_users.splice(i, 1, cur_users[i]);
                        break;
                    }
                }
            },
            getUserById: function (userId, user, callback) {
                for (var i in cur_users) {
                    if (userId === cur_users[i]._id){
                        callback(user,cur_users[i]);
                        break;
                    }
                }
            }
        }
    }
})();


