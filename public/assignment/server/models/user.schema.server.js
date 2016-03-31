/**
 * Created by wendy on 3/29/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: {type:String,default:""},
        lastName: {type:String,default:""},
        emails: [String],
        phones: [String],
        rules: {type:[String],default:["student"]}
    }, {collection: "user"});
    return UserSchema;
};

