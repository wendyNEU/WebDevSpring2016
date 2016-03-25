/**
 * Created by wendy on 3/23/16.
 */

module.exports = function (app, model) {

    app.get("/api/project/comment/:mtype/:tviso_id",findComment);

    app.post("/api/project/comment/:mtype/:tviso_id", createComment);

    app.post("/api/project/comment/:mtype/:tviso_id/comment/:comment_id", createSubComment);

    app.delete("/api/project/comment/:mtype/:tviso_id/comment/:comment_id", deleteComment);

    app.delete("/api/project/comment/:mtype/:tviso_id/comment/:comment_id/subcomment/:subcomment_id", deleteSubComment);

    function findComment(req,res){
        var cs = model.findCommentSetByTvisoId(req.params.tviso_id,req.params.mtype);
        res.json(cs);
    }

    function createComment(req,res){
        var cs = model.createCommentByTvisoId(req.params.tviso_id,req.params.mtype,req.body);
        res.json(cs);
    }

    function createSubComment(req,res){
        var cs = model.createSubCommentByCommentId(req.params.tviso_id,req.params.mtype,req.params.comment_id,req.body);
        res.json(cs);
    }

    function deleteComment(req,res){
        var cs = model.deleteCommentByTvisoId(req.params.tviso_id,req.params.mtype,req.params.comment_id);
        res.json(cs);
    }

    function deleteSubComment(req,res){
        var cs = model.deleteSubCommentByCommentId(req.params.tviso_id,req.params.mtype,req.params.comment_id,req.params.subcomment_id);
        res.json(cs);
    }

};
