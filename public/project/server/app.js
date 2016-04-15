/**
 * Created by wendy on 3/23/16.
 */
module.exports = function(app,mongoose,db){
    var userModel = require("./models/user/user.model.js")(mongoose,db);
    var commentModel   = require("./models/comment/comment.model.js")(mongoose,db);
    var userService = require("./services/user.service.server.js")(app,userModel);
    var commentService = require("./services/comment.service.server.js")(app,commentModel);
}
