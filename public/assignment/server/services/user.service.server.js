/**
 * Created by wendy on 3/15/16.
 */

module.exports = function (app,userModel,formModel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);


    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        var user = userModel.findUserByCredentials(credentials);
        //req.session.curUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        //res.json(req.session.curUser);
        res.json({});
    }

    function logout(req, res) {
       //req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        //req.session.curUser = user;
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.param('username');
        var password = req.param('password');
        if (username === undefined || username === null) {
            var users = userModel.findAllUsers();
            res.json(users);
        } else if (password === undefined || password === null) {
            var user1 = userModel.findUserByUsername(username);
            res.json(user1);
        } else {
            var user2 = userModel.findUserByCredentials({username: username, password: password});
            res.json(user2);
        }
    }

    function findUserById(req, res) {
        var user = userModel.findUserById(req.params.id);
        res.json(user);
    }

    function updateUserById(req, res) {
        var user = userModel.updateUserById(req.params.id, req.body);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var users = userModel.deleteUserById(req.params.id);
        res.json(users);
    }
};