/**
 * Created by wendy on 3/15/16.
 */
var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        updateUserById:updateUserById,
        deleteUserById:deleteUserById
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
        user._id = "ID_" + (new Date()).getTime();
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
}
