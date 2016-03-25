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

    function like(userId, tvisojson, type){
        for(var u in mock){
            if(mock[u]._id==userId){
                if(type=="movie"){
                    for(var i in mock[u].like_movie){
                        if(mock[u].like_movie[i].tviso_id==tvisojson.tviso_id){
                            return mock[u];
                        }
                    }
                    mock[u].like_movie.push(tvisojson);
                }else if(type=="tv"){
                    for(var i in mock[u].like_tv){
                        if(mock[u].like_tv[i].tviso_id==tvisojson.tviso_id){
                            return mock[u];
                        }
                    }
                    mock[u].like_tv.push(tvisojson);
                }else if(type=="actor"){
                    for(var i in mock[u].like_actor){
                        if(mock[u].like_actor[i].tviso_id==tvisojson.tviso_id){
                            return mock[u];
                        }
                    }
                    mock[u].like_actor.push(tvisojson);
                }else{
                    return null;
                }
                return mock[u];
            }
        }
        return null;
    }

    function unlike(userId, Id, type){
        for(var u in mock){
            if(mock[u]._id==userId){
                if(type=="movie"){
                    for(var i in mock[u].like_movie){
                        if(mock[u].like_movie[i].movie_id==Id){
                            mock[u].like_movie.splice(i,1);
                            return mock[u];
                        }
                    }
                }else if(type=="tv"){
                    for(var i in mock[u].like_tv){
                        if(mock[u].like_tv[i].tv_id==Id){
                            mock[u].like_tv.splice(i,1);
                            return mock[u];
                        }
                    }
                }else if(type=="actor"){
                    for(var i in mock[u].like_actor){
                        if(mock[u].like_actor[i].actor_id==Id){
                            mock[u].like_actor.splice(i,1);
                            return mock[u];
                        }
                    }
                }
                break;
            }
        }
        return null;
    }
}

