/**
 * Created by wendy on 4/14/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var SubCommentSchema = mongoose.Schema({
        text:String,
        user_id: { type: mongoose.Schema.Types.ObjectId },
        username: String,
        date:{type: Date, default: Date.now}
    });

    var CommentSchema = mongoose.Schema({
        text:String,
        user_id: { type: mongoose.Schema.Types.ObjectId },
        username: String,
        date:{type: Date, default: Date.now},
        subcomments:[SubCommentSchema]
    });

    var CommentSetSchema = mongoose.Schema({
        type:{type:String,enum: ['movie', 'tv', 'actor', 'season']},
        tviso_id: Number,
        comments:[CommentSchema]
    }, {collection: "project.comment"});
    return CommentSetSchema;
};
