/**
 * Created by wendy on 3/15/16.
 */
//var mock = require("./user.mock.json");

var q = require("q");
var mongodb = require("mongodb");

module.exports = function (mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(
            user,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            {},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(
            userId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();
        UserModel.update(
            {"_id": userId},
            user,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}
