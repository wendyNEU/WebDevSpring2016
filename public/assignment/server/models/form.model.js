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
        deleteFormById:deleteFormById,
        getFieldsByFormId:getFieldsByFormId,
        getFieldByFormFieldId:getFieldByFormFieldId,
        deleteFieldByFormFieldId:deleteFieldByFormFieldId,
        createFieldByFormFieldId:createFieldByFormFieldId,
        updateFieldByFormFieldId:updateFieldByFormFieldId
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

    function getFieldsByFormId(formId){
        for(var f in mock){
            if(mock[f]._id==formId){
                return mock[f].fields;
            }
        }
        return null;
    }
    function getFieldByFormFieldId(formId,fieldId){
        var fields = getFieldsByFormId(formId);
        for(var f in fields){
            if(fields[f]._id==fieldId){
                return fields[f];
            }
        }
        return null;
    }

    function deleteFieldByFormFieldId(formId,fieldId){
        for(var f in mock){
            if(mock[f]._id==formId){
                for(var i in mock[f].fields){
                    if(mock[f].fields[i]._id==fieldId){
                        mock[f].fields.splice(i,1);
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }

    function createFieldByFormFieldId(formId, field){
        for(var f in mock){
            if(mock[f]._id==formId){
                field._id = "ID_" + (new Date()).getTime();
                mock[f].fields.push(field);
                return mock[f].fields;
            }
        }
        return null;
    }

    function updateFieldByFormFieldId(formId, fieldId, field){
        for(var f in mock){
            if(mock[f]._id==formId){
                for(var i in mock[f].fields){
                    if(mock[f].fields[i]._id==fieldId){
                        mock[f].fields.splice(i,1,field);
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }
}
