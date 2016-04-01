/**
 * Created by wendy on 3/17/16.
 */
module.exports = function(app,userModel,formModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field",createFieldByFormFieldId);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldByFormFieldId);
    app.put("/api/assignment/form/:formId/field",updateFieldsByFormId);

    function getFieldsByFormId(req,res){
        formModel.getFieldsByFormId(req.params.formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldByFormFieldId(req,res){
        formModel.getFieldByFormFieldId(req.params.formId, req.params.fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormFieldId(req,res){
        console.log("server service");
        console.log(req.params.fieldId);
        formModel.deleteFieldByFormFieldId(req.params.formId, req.params.fieldId)
        .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldByFormFieldId(req,res){
        formModel.createFieldByFormFieldId(req.params.formId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormFieldId(req,res){
        formModel.updateFieldByFormFieldId(req.params.formId, req.params.fieldId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldsByFormId(req, res) {
        formModel.updateFieldsByFormId(req.params.formId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}