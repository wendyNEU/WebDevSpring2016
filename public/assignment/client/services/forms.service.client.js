/**
 * Created by wendy on 2/17/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];


        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
            console.log(forms);
        }

        function findAllFormsForUser(userId, callback) {
            var matchForms = [];
            for (var i in forms) {
                if (forms[i].userId === userId) {
                    matchForms.push(forms[i]);
                }
            }
            callback(matchForms);
        }

        function deleteFormById(formId, callback) {
            for (var i in forms) {
                if (forms[i]._id === formId) {
                    forms.splice(i, 1);
                    callback(forms);
                    break;
                }
            }
            console.log(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
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
})();

