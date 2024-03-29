/**
 * Created by wendy on 3/29/16.
 */
var mongoose = require('mongoose');

module.exports = function (mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a movie schema
    var FormSchema = mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId },
        title: {type: String, default: "New Form"},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: "assignment.form"});
    return FormSchema;

};
