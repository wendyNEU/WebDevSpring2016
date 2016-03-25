/**
 * Created by wendy on 3/15/16.
 */

module.exports = function (app, model) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);

    //like movie, tv and actor
    app.post("/api/project/user/:user_id/movie",likeMovie);
    app.post("/api/project/user/:user_id/tv",likeTV);
    app.post("/api/project/user/:user_id/actor",likeActor);
    //unlike movie, tv and actor
    app.delete("/api/project/user/:user_id/movie/:movie_id",UnlikeMovie);
    app.delete("/api/project/user/:user_id/tv/:tv_id",UnlikeTV);
    app.delete("/api/project/user/:user_id/actor/:actor_id",UnlikeActor);

    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function loggedin(req, res) {
        res.json({});
    }

    function logout(req, res) {
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user = model.createUser(user);
        //req.session.curUser = user;
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.param('username');
        var password = req.param('password');
        if (username === undefined || username === null) {
            var users = model.findAllUsers();
            res.json(users);
        } else if (password === undefined || password === null) {
            var user1 = model.findUserByUsername(username);
            res.json(user1);
        } else {
            var user2 = model.findUserByCredentials({username: username, password: password});
            res.json(user2);
        }
    }

    function findUserById(req, res) {
        var user = model.findUserById(req.params.id);
        res.json(user);
    }

    function updateUserById(req, res) {
        console.log(req.body);
        var user = model.updateUserById(req.params.id, req.body);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var users = model.deleteUserById(req.params.id);
        res.json(users);
    }

    function likeMovie(req, res){
        var user = model.like(req.params.user_id, req.body,"movie");
        res.json(user);
    }
    function likeTV(req, res){
        var user = model.like(req.params.user_id, req.body,"tv");
        res.json(user);
    }
    function likeActor(req, res){
        var user = model.like(req.params.user_id, req.body,"actor");
        res.json(user);
    }
    function UnlikeMovie(req, res){
        var user = model.unlike(req.params.user_id, req.params.movie_id, "movie");
        res.json(user);
    }
    function UnlikeTV(req, res){
        var user = model.unlike(req.params.user_id, req.params.tv_id, "tv");
        res.json(user);
    }
    function UnlikeActor(req, res){
        var user = model.unlike(req.params.user_id, req.params.actor_id, "actor");
        res.json(user);
    }
};