/**
 * Created by wendy on 3/23/16.
 */

module.exports = function (app, model) {

    app.get("/api/project/comment/:mtype/:tviso_id", findComment);

    app.post("/api/project/comment/:mtype/:tviso_id", createComment);

    app.post("/api/project/comment/:mtype/:tviso_id/comment/:comment_id", createSubComment);

    app.delete("/api/project/comment/:mtype/:tviso_id/comment/:comment_id", deleteComment);

    app.delete("/api/project/comment/:mtype/:tviso_id/comment/:comment_id/subcomment/:subcomment_id", deleteSubComment);

    function findComment(req, res) {
        model.findCommentSetByTvisoId(req.params.tviso_id, req.params.mtype)
            .then(
                function (commentSet) {
                    res.json(commentSet);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function createComment(req, res) {
        model.createCommentByTvisoId(req.params.tviso_id, req.params.mtype, req.body)
            .then(
                function (commentSet) {
                    res.json(commentSet);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function createSubComment(req, res) {
        model.createSubCommentByCommentId(req.params.tviso_id, req.params.mtype, req.params.comment_id, req.body)
            .then(
                function (subcomments) {
                    res.json(subcomments);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteComment(req, res) {
        model.deleteCommentByTvisoId(req.params.tviso_id, req.params.mtype, req.params.comment_id)
            .then(
                function (comments) {
                    res.json(comments);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteSubComment(req, res) {
        model.deleteSubCommentByCommentId(req.params.tviso_id, req.params.mtype, req.params.comment_id, req.params.subcomment_id)
            .then(
                function (subcomments) {
                    res.json(subcomments);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }
};
