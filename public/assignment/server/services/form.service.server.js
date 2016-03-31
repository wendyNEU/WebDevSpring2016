/**
 * Created by wendy on 3/15/16.
 */
module.exports = function (app, userModel, formModel) {

    app.get("/api/assignment/user/:userId/form", findFormsBelongToUserById);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/form/:userId", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormsBelongToUserById(req, res) {
        formModel.findFormsBelongToUserById(req.params.userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findFormById(req, res) {
        formModel.findFormById(req.params.formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        formModel.deleteFormById(req.params.formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormByUserId(req, res) {

        userModel.findUserById(req.params.userId)
            .then(
                function (doc) {
                    formModel.createForm(doc._id, req.body)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        formModel.updateFormById(req.params.formId, req.body)
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
