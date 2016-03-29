/**
 * Created by wendy on 3/15/16.
 */

module.exports = function(app,mongoose,db){
    var userModel = require("./models/user.model.js")(mongoose,db);
    var formModel   = require("./models/form.model.js")(mongoose,db);
    var userService = require("./services/user.service.server.js")(app,userModel,formModel);
    var formService = require("./services/form.service.server.js")(app,userModel,formModel);
    var fieldService = require("./services/field.service.server.js")(app,userModel,formModel);
}
