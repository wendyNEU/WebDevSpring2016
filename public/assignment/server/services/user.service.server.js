/**
 * Created by wendy on 3/15/16.
 */

module.exports = function (app, userModel, formModel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);


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
        //res.json(req.session.curUser);
        res.json({});
    }

    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        userModel.deleteUserById(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};