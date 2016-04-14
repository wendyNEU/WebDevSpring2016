/**
 * Created by wendy on 3/15/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, userModel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", authenticated,updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    app.get("/api/assignment/curuser",getCurrentUser);

    app.post("/api/assignment/login", passport.authenticate('local'),login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post  ('/api/assignment/register',register);

    app.post("/api/assignment/admin/user",isAdmin,createUser);
    app.get("/api/assignment/admin/user",isAdmin,findAllUsers);
    app.get("/api/assignment/admin/user/:id",isAdmin,findUserById);
    app.delete("/api/assignment/admin/user/:id",isAdmin,deleteUserById);
    app.put("/api/assignment/admin/user/:id",isAdmin,updateUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function getCurrentUser(req,res){
        if(isAuthenticated(req)) {
            userModel.findUserById(req.session.curUser._id)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }else{
            res.send(null);
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authenticated (req, res, next) {
        if (isAuthenticated(req)) {
            next();
        } else {
            res.send(401);
        }
    };

    function isAuthenticated(req){
        return req.session.curUser!=null;
    }

    function isAdmin(req,res,next) {
        if(req.isAuthenticated()) {
            for(var i in req.session.curUser.rules){
                if(req.session.curUser.rules[i]=='admin'){
                    return next();
                }
            }
            res.send(403);
        }else{
            res.send(403);
        }
    }

    function login(req, res) {
        var user = req.user;
        req.session.curUser = user;
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.session.curUser = user;
                        res.json(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function findUser(req, res) {
        var username = req.param('username');
        var password = req.param('password');
        if (username === undefined || username === null) {
            userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else if (password === undefined || password === null) {
            userModel.findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            userModel.findUserByCredentials({username: username, password: password})
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        userModel.findUserById(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        userModel.updateUserById(req.params.id, req.body)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        userModel.deleteUserById(req.params.id)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){

                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res){
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

};