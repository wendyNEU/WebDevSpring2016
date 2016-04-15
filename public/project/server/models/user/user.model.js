/**
 * Created by wendy on 3/22/16.
 */
var q = require("q");
var mongodb = require("mongodb");

module.exports = function(mongoose,db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        updateUserById:updateUserById,
        deleteUserById:deleteUserById,
        like:like,
        unlike:unlike
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
    function findAllUsers(){
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
    function findUserById(userId){
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
    function findUserByUsername(username){
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
    function updateUserById(userId,user){
        var deferred = q.defer();
        UserModel.update(
            {"_id": userId},
            { "$set": user },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
    function deleteUserById(userId){
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

    function like(userId, tvisojson){
        console.log(userId);
        console.log(tvisojson);
        var deferred = q.defer();
        UserModel.findById(
            userId,
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    user.like.push({"tviso_id":tvisojson.tviso_id,"type":tvisojson.type});
                    user.save(function (err) {
                        if (!err){
                            deferred.resolve(user.like);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function unlike(userId, tviso_id, type){
        console.log(userId);
        console.log(tviso_id);
        console.log(type);
        var deferred = q.defer();
        UserModel.findById(
            userId,
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for(var i in user.like){
                        if(user.like[i].tviso_id==tviso_id && user.like[i].type==type){
                            user.like.splice(i,1);
                            break;
                        }
                    }
                    user.save(function (err) {
                        if (!err){
                            deferred.resolve(user.like);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }
}

