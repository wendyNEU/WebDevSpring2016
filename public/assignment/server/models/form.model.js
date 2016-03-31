/**
 * Created by wendy on 3/15/16.
 */
var q = require("q");
var mongodb = require("mongodb");

module.exports = function(mongoose, db) {
    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

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
        updateFieldByFormFieldId:updateFieldByFormFieldId,
        updateFieldsByFormId: updateFieldsByFormId
    };
    return api;
    //unused
    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne(
            {title: title},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
    function createForm(userId, form) {
        form.fields = [];
        form.userId = userId;

        var deferred = q.defer();
        FormModel.create(
            form,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findFormsBelongToUserById(userId){
        var deferred = q.defer();
        FormModel.find(
            {userId : userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("findFormsBelongToUserById");
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("findFormById");
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteFormById(formId){
        var deferred = q.defer();
        FormModel.remove(
            {_id: new mongodb.ObjectId(formId)},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateFormById(formId,form){
        var deferred = q.defer();
        FormModel.update(
            {"_id": mongodb.ObjectId(formId)},
            form,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function getFieldsByFormId(formId){
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("getFieldsByFormId");
                    console.log(doc);
                    deferred.resolve(doc.fields);
                }
            });
        return deferred.promise;
    }
    function getFieldByFormFieldId(formId,fieldId){
        var deferred = q.defer();
        FormModel.find(
            {
                "_id":formId,
                "fields._id": fieldId
            },
            {
                fields: {$splice:0}
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("getFieldByFormFieldId");
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteFieldByFormFieldId(formId,fieldId){
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("deleteFieldByFormFieldId");
                    form.fields.id(fieldId).remove();
                    form.save(function (err) {
                        if (!err){
                            console.log(form.fields);
                            deferred.resolve(form.fields);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function createFieldByFormFieldId(formId, field){
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("createFieldByFormFieldId");
                    form.fields.push(field);
                    form.save(function (err) {
                        if (!err){
                            console.log(form.fields);
                            deferred.resolve(form.fields);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function updateFieldByFormFieldId(formId, fieldId, field){
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("updateFieldByFormFieldId");
                    for(var i=0;i<form.fields.length;i++){
                        if(form.fields[i]._id==fieldId){
                            form.fields.splice(i,1,field);
                            break;
                        }
                    }
                    form.save(function (err) {
                        if (!err){
                            console.log(form.fields);
                            deferred.resolve(form.fields);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function updateFieldsByFormId(formId, fields) {
        var deferred = q.defer();
        FormModel.findById(
            formId,
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    form.fields = fields;
                    form.save(function (err) {
                        if (!err){
                            console.log(form.fields);
                            deferred.resolve(form.fields);
                        }else{
                            deferred.reject(err);
                        }
                    });
                }
            });
        return deferred.promise;
    }
}
