/**
 * Created by wendy on 3/15/16.
 */
var mock = require("./form.mock.json");
module.exports = function() {
    var forms = []
    var api = {
        findFormByTitle:findFormByTitle,
        createForm: createForm
    };
    return api;

    function findFormByTitle(title) {
        for(var f in forms) {
            if(forms[f].title === title) {
                return forms[f];
            }
        }
        return null;
    }
    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        forms.push(form);
        return form;
    }
}
