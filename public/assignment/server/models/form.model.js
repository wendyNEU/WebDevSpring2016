/**
 * Created by wendy on 3/15/16.
 */
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        findFormByTitle:findFormByTitle,
        createForm: createForm,
        findFormsBelongToUserById:findFormsBelongToUserById,
        updateFormById:updateFormById,
        findFormById: findFormById,
        deleteFormById:deleteFormById
    };
    return api;

    function findFormByTitle(title) {
        for(var f in mock) {
            if(mock[f].title == title) {
                return mock[f];
            }
        }
        return null;
    }
    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function findFormsBelongToUserById(userId){
        var matchForms = [];
        for(var f in mock){
            if(mock[f].userId==userId){
                matchForms.push(mock[f]);
            }
        }
        return matchForms;
    }

    function findFormById(formId){
        for(var f in mock){
            if(mock[f]._id==formId){
                return mock[f];
            }
        }
        return null
    }

    function deleteFormById(formId){
        for(var f in mock){
            if(mock[f]._id==formId){
                mock.splice(f,1);
                return mock;
            }
        }
        return null;
    }

    function updateFormById(formId,form){
        for(var f in mock){
            if(mock[f]._id==formId){
                mock.splice(f,1,form);
                return mock;
            }
        }
        return null;
    }
}
