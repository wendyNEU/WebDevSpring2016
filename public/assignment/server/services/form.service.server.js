/**
 * Created by wendy on 3/15/16.
 */
module.exports = function(app,userModel,formModel) {

    app.get("/api/assignment/user/:userId/form",findFormsBelongToUserById);
    app.get("/api/assignment/form/:formId",findFormById);
    app.delete("/api/assignment/form/:formId",deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormByUserId);
    app.put("/api/assignment/form/:formId",updateFormById);

    function findFormsBelongToUserById(req, res) {
        var forms = formModel.findFormsBelongToUserById(req.params.userId);
        res.json(forms);
    }

    function findFormById(req, res){
        var form = formModel.findFormById(req.params.formId);
        res.json(form);
    }

    function deleteFormById(req,res){
        var forms = formModel.deleteFormById(req.params.formId);
        res.json(forms);
    }

    function createFormByUserId(req,res){
        req.body.userId = req.params.userId;
        var form = formModel.createForm(req.body);
        res.json(form);
    }

    function updateFormById(req,res){
        var forms = formModel.updateFormById(req.params.formId,req.body);
        res.json(forms);
    }
}
