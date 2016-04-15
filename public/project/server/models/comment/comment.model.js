/**
 * Created by wendy on 3/23/16.
 */
var q = require("q");
var mongodb = require("mongodb");

module.exports = function(mongoose,db) {
    var CommentSetSchema = require("./comment.schema.server.js")(mongoose);
    var CommentSetModel = mongoose.model('CommentSet', CommentSetSchema);

    var api = {
        findCommentSetByTvisoId: findCommentSetByTvisoId,
        createCommentByTvisoId:createCommentByTvisoId,
        createSubCommentByCommentId:createSubCommentByCommentId,
        deleteCommentByTvisoId:deleteCommentByTvisoId,
        deleteSubCommentByCommentId:deleteSubCommentByCommentId
    };
    return api;

    function findCommentSetByTvisoId(tvisoId,type){
        var deferred = q.defer();
        CommentSetModel.findOne(
            {tviso_id: tvisoId, type: type},
            function (err, commentSet) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(commentSet);
                }
            });
        return deferred.promise;
    }

    function createCommentByTvisoId(tvisoId,type,comment){
        var deferred = q.defer();
        CommentSetModel.findOne(
            { tviso_id: tvisoId, type: type },
            function (err, commentSet) {
                if (err||commentSet==null) {
                    var commentSet = {type:type,tviso_id:tvisoId,comments:[comment]};
                    CommentSetModel.create(
                        commentSet,
                        function (err, commentSet) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(commentSet);
                            }
                        });
                } else {
                    console.log(commentSet);
                    commentSet.comments.push(comment);
                    commentSet.save(function (err) {
                        if (!err){
                            deferred.resolve(commentSet);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function createSubCommentByCommentId(tvisoId,type,comment_id,subcomment){
        var deferred = q.defer();
        CommentSetModel.findOne(
            {
                "tviso_id":tvisoId,
                "type":type
            },
            function (err, commentSet) {
                if (err) {
                    deferred.reject(err);
                } else {
                    commentSet.comments.id(comment_id).subcomments.push(subcomment);
                    commentSet.save(function (err) {
                        if (err){
                            deferred.reject(err);
                        }else{
                            deferred.resolve(commentSet.comments.id(comment_id).subcomments);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function deleteCommentByTvisoId(tvisoId,type,comment_id){
        var deferred = q.defer();
        CommentSetModel.findOne(
            {
                "tviso_id":tvisoId,
                "type":type
            },
            function (err, commentSet) {
                if (err) {
                    deferred.reject(err);
                } else {
                    commentSet.comments.id(comment_id).remove();
                    commentSet.save(function (err) {
                        if (err){
                            deferred.reject(err);
                        }else{
                            deferred.resolve(commentSet.comments);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function deleteSubCommentByCommentId(tvisoId,type,comment_id,subcomment_id){
        var deferred = q.defer();
        CommentSetModel.findOne(
            {
                "tviso_id":tvisoId,
                "type":type
            },
            function (err, commentSet) {
                if (err) {
                    deferred.reject(err);
                } else {
                    commentSet.comments.id(comment_id).subcomments.id(subcomment_id).remove();
                    commentSet.save(function (err) {
                        if (err){
                            deferred.reject(err);
                        }else{
                            deferred.resolve(commentSet.comments);
                        }
                    });
                }
            });
        return deferred.promise;
    }
}
