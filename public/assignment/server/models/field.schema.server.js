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
            enum: ["TEXT", "EMAIL", "TEXTAREA","PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: {type:[{label: String, value: String}],default:[]}
    }, {collection: "assignment.field"});
    return FieldSchema;
};