/**
 * Created by wendy on 3/23/16.
 */
var mock = require("./comment.mock.json");
var Guid = require('../../../../../js/guid.js');
module.exports = function() {
    var api = {
        findCommentSetByTvisoId: findCommentSetByTvisoId,
        createCommentByTvisoId:createCommentByTvisoId,
        createSubCommentByCommentId:createSubCommentByCommentId,
        deleteCommentByTvisoId:deleteCommentByTvisoId,
        deleteSubCommentByCommentId:deleteSubCommentByCommentId
    };
    return api;

    function findCommentSetByTvisoId(tvisoId,type){
        for(var i in mock){
            if(mock[i].tvisoId==tvisoId&&mock[i].type==type){
                mock[i].push(comment);
                return mock[i];
            }
        }
        return null;
    }

    function createCommentsSet(tvisoId, type){
        return {"_id":Guid.create(),"type":type,"tviso_id":tvisoId,comments:[]};
    }

    function createCommentByTvisoId(tvisoId,type,comment){
        comment._id = Guid.create();
        comment.subcomments = [];
        for(var i in mock){
            if(mock[i].tvisoId==tvisoId&&mock[i].type==type){
                mock[i].push(comment);
                return mock[i];
            }
        }
        var tvisoCommentSet = createCommentsSet(tvisoId,type);
        comment._id = Guid.create();
        tvisoCommentSet.comments.push(comment);
        mock.push(tvisoCommentSet);
        return mock[mock.length-1];
    }

    function createSubCommentByCommentId(tvisoId,type,comment_id,subcomment){
        subcomment._id = Guid.create();
        for(var i in mock){
            if(mock[i].tvisoId==tvisoId&&mock[i].type==type){
                for(var j in mock[i].comments){
                    if(mock[i].comments[j]._id==comment_id){
                        mock[i].comments[j].push(subcomment);
                        return mock[i];
                    }
                }
            }
        }
        return null;
    }

    function deleteCommentByTvisoId(tvisoId,type,comment_id){
        for(var i in mock){
            if(mock[i].tvisoId==tvisoId&&mock[i].type==type){
                for(var j in mock[i].comments){
                    if(mock[i].comments[j]._id==comment_id){
                        mock[i].comments.splice(j,1);
                        return mock[i];
                    }
                }
                return null;
            }
        }
        return null;
    }

    function deleteSubCommentByCommentId(tvisoId,type,comment_id,subcomment_id){
        for(var i in mock){
            if(mock[i].tvisoId==tvisoId&&mock[i].type==type){
                for(var j in mock[i].comments){
                    if(mock[i].comments[j]._id==comment_id){
                        for(var k in mock[i].comments[j].subcomments){
                            if(mock[i].comments[j].subcomments[k]==subcomment_id){
                                mock[i].comments[j].subcomments.splice(k,1);
                                return mock[i];
                            }
                        }
                        return null;
                    }
                }
                return null;
            }
        }
        return null;
    }
}
