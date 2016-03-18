/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController($q, $routeParams,FieldService) {
        console.log("Fieldontroller");

        var vm = this;

        function init() {
            vm.curField = null;
            vm.addField = addField;
            vm.findAllFieldsByFormId = findAllFieldsByFormId;
            vm.deleteField=deleteField;
            vm.setCurrentField = setCurrentField;
            vm.getCurrentField = getCurrentField;
            vm.fieldTypes = [{"type":"TEXT","text":"Single Line Text Field",},{"type":"TEXTAREA","text":"Multi Line Text Field"},{"type":"DATE","text":"Date Field"},{"type":"OPTIONS","text":"Dropdown Field"},{"type":"CHECKBOXES","text":"Checkboxes Field"},{"type":"RADIOS","text":"Radio Buttons Field"},{"type":"EMAIL","text":"Email Text Fields"}];
            vm.fieldType = vm.fieldTypes[0].type;
            findAllFieldsByFormId();
        }

        init();

        function findAllFieldsByFormId(){
            var formId = $routeParams.formId;

            var deferred = $q.defer();

            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                        console.log(vm.fields);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function addField(){
            console.log(vm.fieldType);
            var field = {};
            if(vm.fieldType=='TEXT'){
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }else if(vm.fieldType=='TEXTAREA'){
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }else if(vm.fieldType=='DATE'){
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }else if(vm.fieldType=='OPTIONS'){
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            }else if(vm.fieldType=='CHECKBOXES'){
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }else if(vm.fieldType=='RADIOS'){
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }else{
                field = {"_id": null, "label": "New Email Field", "type": "EMAIL", "placeholder": "New Email Field"};
            }

            var deferred = $q.defer();

            FieldService
                .createFieldForForm($routeParams.formId,field)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function deleteField(fieldId){
            var deferred = $q.defer();

            FieldService
                .deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                        console.log(vm.fields);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function setCurrentField(field){
            vm.curField = field;
        }

        function getCurrentField(){
            return vm.curField;
        }
    }
})();
