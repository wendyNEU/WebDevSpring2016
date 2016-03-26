/**
 * Created by wendy on 3/22/16.
 */
var mock = require("./user.mock.json");
var Guid = require('../../../../../js/guid.js');
module.exports = function() {
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
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
    function createUser(user) {
        user._id = Guid.create();
        mock.push(user);
        return user;
    }
    function findAllUsers(){
        return mock;
    }
    function findUserById(userId){
        for(var u in mock) {
            if( mock[u]._id == userId){
                return mock[u];
            }
        }
        return null;
    }
    function findUserByUsername(username){
        for(var u in mock) {
            if( mock[u].username == username){
                return mock[u];
            }
        }
        return null;
    }
    function updateUserById(userId,user){
        for(var u in mock) {
            if( mock[u]._id == userId){
                mock.splice(u,1,user);
                return mock[u];
            }
        }
        return null;
    }
    function deleteUserById(userId){
        for(var u in mock) {
            if( mock[u]._id == userId){
                mock.splice(u,1);
                return mock;
            }
        }
        return null;
    }

    function like(userId, tvisojson){
        console.log(userId);
        console.log(tvisojson);
        for(var u in mock){
            if(mock[u]._id==userId){
                for(var i in mock[u].like){
                    if(mock[u].like[i].tviso_id==tvisojson.tviso_id&&mock[u].like[i].type ==tvisojson.type){
                        return mock[u].like;
                    }
                }
                mock[u].like.push(tvisojson);
                console.log(mock[u]);
                return mock[u].like;
            }
        }
        return null;
    }

    function unlike(userId, tviso_id, type){
        console.log(userId);
        console.log(tviso_id);
        console.log(type);
        for(var u in mock){
            if(mock[u]._id==userId){
                for(var i in mock[u].like){
                    if(mock[u].like[i].tviso_id==tviso_id&&mock[u].like[i].type==type){
                        mock[u].like.splice(i,1);
                        console.log(mock[u]);
                        return mock[u].like;
                    }
                }
                break;
            }
        }
        return null;
    }
}

