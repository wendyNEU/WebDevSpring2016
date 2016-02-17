/**
 * Created by wendy on 2/17/16.
 */
(function () {
    var FormBuilderApp = angular.module('FormBuilderApp');
    FormBuilderApp.factory('FormService', FormService)

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];
        return {
            createFormForUser: function(userId, form, callback){
                form._id = (new Date).getTime();
                form.userId = userId;
                forms.push(form);
                callback(form);
                console.log(forms);
            },
            findAllFormsForUser: function(userId, callback){
                var matchForms = [];
                for(var i=0;i<forms.length;i++){
                    if(forms[i].userId===userId){
                        matchForms.push(forms[i]);
                    }
                }
                callback(matchForms);
            },
            deleteFormById:function(formId, callback){
                for(var i=0;i<forms.length;i++) {
                    if (forms[i]._id === formId) {
                        forms.splice(i,1);
                        break;
                    }
                }
                callback(forms);
                console.log(forms);
            },
            updateFormById:function(formId, newForm, callback){
                for(var i=0;i<forms.length;i++) {
                    if (forms[i]._id === formId) {
                        forms[i].title = newForm.title;
                        forms[i].userId = newForm.userId;
                        callback(forms[i]);
                        break;
                    }
                }
                console.log(forms);
            }
        }
    }
})();

