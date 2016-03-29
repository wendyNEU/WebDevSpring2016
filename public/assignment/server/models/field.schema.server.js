/**
 * Created by wendy on 3/29/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: "TEXT",
            enum: ["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: "project.field"});
    return FieldSchema;
};