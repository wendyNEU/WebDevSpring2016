/**
 * Created by wendy on 3/15/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, model) {

    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", authenticated,updateProfile);
    app.delete("/api/project/user/:id", deleteUserById);

    //like movie, tv and actor
    app.post("/api/project/user/like",authenticated,like);
    //unlike movie, tv and actor
    app.delete("/api/project/user/unlike/:mtype/:tviso_id",authenticated,unlike);

    app.post("/api/project/login", passport.authenticate('local'),login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post  ('/api/project/register',register);

    app.post("/api/project/admin/user",isAdmin,adminCreateUser);
    app.get("/api/project/admin/user",isAdmin,findAllUsers);
    app.get("/api/project/admin/user/:id",isAdmin,findUserById);
    app.delete("/api/project/admin/user/:id",isAdmin,deleteUserById);
    app.put("/api/project/admin/user/:id",isAdmin,updateUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        model
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
        model
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
        if (req.session.curUser!=null) {
            next();
        } else {
            res.send(401);
        }
    };

    function isAdmin(req,res,next) {
        if(req.session.curUser!=null&&req.session.curUser.rules=='admin') {
            return next();
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
        model.findUserByCredentials(credentials)
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
        if(req.session.curUser!=null) {
            model.findUserById(req.session.curUser._id)
                .then(
                    function (doc) {
                        console.log(doc);
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

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function register(req,res){
        var newUser = req.body;
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
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

    function adminCreateUser(req, res) {
        var newUser = req.body;
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return model.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.findAllUsers();
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

    function findAllUsers(req,res){
        model
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

    function findUser(req, res) {
        if (username === undefined || username === null) {
            model.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else if (password === undefined || password === null) {
            model.findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            model.findUserByCredentials({username: username, password: password})
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
        model.findUserById(req.params.id)
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
        model.updateUserById(req.params.id, req.body)
            .then(
                function(user){
                    return model.findAllUsers();
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

    function updateProfile(req, res) {
        model.updateUserById(req.params.id, req.body)
            .then(
                function(doc){
                    return model.findUserById(req.params.id);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        model.deleteUserById(req.params.id)
            .then(
                function(user){
                    return model.findAllUsers();
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

    function like(req, res){
        model.like(req.session.curUser._id, req.body)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function unlike(req, res){
        model.unlike(req.session.curUser._id, req.params.tviso_id,req.params.mtype)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

};