/**
 * Created by wendy on 4/14/16.
 */
module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: {type:String,default:""},
        lastName: {type:String,default:""},
        username: String,
        password: String,
        email: String,
        rules: {type:String,default:"student",enum:['admin','student']},
        photo: { data: Buffer, contentType: String },
        like: [{tviso_id: Number, type: {type:String,enum: ['movie', 'tv', 'actor', 'season']}}]
    }, {collection: "project.user"});
    return UserSchema;
};
