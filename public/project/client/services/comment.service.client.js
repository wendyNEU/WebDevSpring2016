/**
 * Created by wendy on 3/23/16.
 */

(function() {
    angular.module("MovieFanApp")
        .factory("CommentService", CommentService);

    function CommentService($http,$rootScope) {

        var api = {
            getCommentSet:getCommentSet,
            createComment:createComment,
            createSubComment:createSubComment,
            deleteComment:deleteComment,
            deleteSubcomment:deleteSubcomment
        };
        return api;

        function getCommentSet(type,tviso_id){
            return $http.get("/api/project/comment/"+type+"/"+tviso_id);
        }

        function createComment(type,tviso_id,comment){
            comment.user_id = $rootScope.curUser._id;
            return $http.post("/api/project/comment/"+type+"/"+tviso_id,comment);
        }

        function createSubComment(type,tviso_id,comment_id,subcomment){
            subcomment.user_id = $rootScope.curUser._id;
            return $http.post("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id,subcomment);
        }

        function deleteComment(type,tviso_id,comment_id){
            return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id,comment);
        }

        function deleteSubcomment(type,tviso_id,comment_id,subcomment_id){
            return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id+"/subcomment/"+subcomment_id);
        }
    }
})();

