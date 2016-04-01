/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController($q, $route, $routeParams, FieldService) {
        console.log("Fieldontroller");

        var vm = this;

        function init() {
            vm.modalfield = {"label": "", "content": ""};
            vm.curField = null;
            vm.$route = $route;
            vm.addField = addField;
            vm.findAllFieldsByFormId = findAllFieldsByFormId;
            vm.deleteField = deleteField;
            vm.setCurrentField = setCurrentField;
            vm.getCurrentField = getCurrentField;
            vm.editField = editField;
            vm.getModalTitle = getModalTitle;
            vm.fieldTypes = [{"type": "TEXT", "text": "Single Line Text Field"}, {
                "type": "EMAIL",
                "text": "Email Text Fields"
            }, {"type": "TEXTAREA", "text": "Multi Line Text Field"}, {
                "type": "PASSWORD",
                "text": "Password Text Fields"
            }, {"type": "OPTIONS", "text": "Dropdown Field"}, {"type": "DATE", "text": "Date Field"}, {
                "type": "RADIOS",
                "text": "Radio Buttons Field"
            }, {"type": "CHECKBOXES", "text": "Checkboxes Field"}];
            vm.fieldType = vm.fieldTypes[0].type;
            vm.updateFields = updateFields;
            vm.findAllFieldsByFormId();
        }

        init();

        function findAllFieldsByFormId() {
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

        function addField() {
            var field = {};
            if (vm.fieldType == 'TEXT') {
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Text Field"};
            } else if (vm.fieldType == 'EMAIL') {
                field = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Email Field"};
            } else if (vm.fieldType == 'PASSWORD') {
                field = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Password Field"};
            } else if (vm.fieldType == 'TEXTAREA') {
                field = {"label": "New Text Area Field", "type": "TEXTAREA", "placeholder": "New Text Area Field"};
            } else if (vm.fieldType == 'DATE') {
                field = {"label": "New Date Field", "type": "DATE"};
            } else if (vm.fieldType == 'OPTIONS') {
                field = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (vm.fieldType == 'CHECKBOXES') {
                field = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (vm.fieldType == 'RADIOS') {
                field = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            } else {
                alert("fields type doesn't exist");
            }

            var deferred = $q.defer();

            FieldService
                .createFieldForForm($routeParams.formId, field)
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

        function deleteField(fieldId) {
            var deferred = $q.defer();

            FieldService
                .deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function (response) {
                    if (response.status==200) {
                        vm.findAllFieldsByFormId();
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function setCurrentField(field) {
            vm.curField = field;
            if (vm.curField.type == 'TEXT' || vm.curField.type == 'TEXTAREA' || vm.curField.type == 'EMAIL'||vm.curField.type == 'PASSWORD') {
                vm.modalfield.label = vm.curField.label;
                vm.modalfield.content = vm.curField.placeholder;
            } else if (vm.curField.type == 'DATE') {
                vm.modalfield.label = vm.curField.label;
            } else if (vm.curField.type == 'OPTIONS' || vm.curField.type == 'CHECKBOXES' || vm.curField.type == 'RADIOS') {
                vm.modalfield.label = vm.curField.label;
                vm.modalfield.content = "";
                for (var i in vm.curField.options) {
                    vm.modalfield.content += vm.curField.options[i].label + ":" + vm.curField.options[i].value + "\n";
                }
            }
        }

        function getCurrentField() {
            return vm.curField;
        }

        function editField() {
            if (vm.curField.type == 'TEXT' || vm.curField.type == 'TEXTAREA' || vm.curField.type == 'EMAIL'|| vm.curField.type == 'PASSWORD') {
                vm.curField.label = vm.modalfield.label;
                vm.curField.placeholder = vm.modalfield.content;
            } else if (vm.curField.type == 'DATE') {
                vm.curField.label = vm.modalfield.label;
            } else if (vm.curField.type == 'OPTIONS' || vm.curField.type == 'CHECKBOXES' || vm.curField.type == 'RADIOS') {
                vm.curField.label = vm.modalfield.label;
                vm.curField.options = [];
                var options = vm.modalfield.content.split("\n");
                for (var i = 0; i < options.length; i++) {
                    var line = options[i].split(":");
                    if (options[i] !== '' && line.length == 2) {
                        var option = {"label": line[0], "value": line[1]};
                        vm.curField.options.push(option);
                    }
                }
            } else {
                alert("update fail:input format error");
                return;
            }

            var deferred = $q.defer();
            var updateField = jQuery.extend({}, vm.curField);
            if(updateField.hasOwnProperty('_id')){
                delete updateField._id;
            }

            FieldService
                .updateField($routeParams.formId, vm.curField._id, updateField)
                .then(function (response) {
                    if(response.data.ok==1){
                        vm.findAllFieldsByFormId();
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            vm.curField = null;
            return deferred.promise;
        }

        function getModalTitle() {
            if (vm.curField == null) return "";
            for (var i in vm.fieldTypes) {
                if (vm.curField.type == vm.fieldTypes[i].type) {
                    return vm.fieldTypes[i].text;
                }
            }
            return "";
        }

        function updateFields(fields) {
            var formId = $routeParams.formId;

            FieldService
                .updateFields(formId, fields)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }

    }
})();
