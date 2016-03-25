/**
 * Created by wendy on 3/23/16.
 */
module.exports = function(app){
    var userModel = require("./models/user/user.model.js")();
    var userService = require("./services/user.service.server.js")(app,userModel);

    var commentModel   = require("./models/comment/comment.model.js")();
    var commentService = require("./services/comment.service.server.js")(app,commentModel);
}
