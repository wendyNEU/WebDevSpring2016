/**
 * Created by wendy on 3/17/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldByFormFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field",createFieldByFormFieldId);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldByFormFieldId);

    function getFieldsByFormId(req,res){
        var fields = formModel.getFieldsByFormId(req.params.formId);
        res.json(fields);
    }

    function getFieldByFormFieldId(req,res){
        var field = formModel.getFieldByFormFieldId(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteFieldByFormFieldId(req,res){
        var fields = formModel.deleteFieldByFormFieldId(req.params.formId, req.params.fieldId);
        res.json(fields);
    }

    function createFieldByFormFieldId(req,res){
        var fields = formModel.createFieldByFormFieldId(req.params.formId, req.body);
        res.json(fields);
    }

    function updateFieldByFormFieldId(req,res){
        var field = formModel.updateFieldByFormFieldId(req.params.formId, req.params.fieldId, req.body);
        res.json(field);
    }
}