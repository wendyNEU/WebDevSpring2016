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
            vm.textfield = {"_id": null, "label": "", "type": "TEXT", "placeholder": ""};
            vm.textareafield = {"_id": null, "label": "", "type": "TEXTAREA", "placeholder": ""};
            vm.emailfield = {"_id": null, "label": "", "type": "EMAIL", "placeholder": ""};
            vm.datefield = {"_id": null, "label": "", "type": "DATE"};
            vm.dropdown = {"_id": null, "label": "", "type": "OPTIONS", "options": ""};
            vm.checkboxfield = {"_id": null, "label": "", "type": "CHECKBOXES", "options": ""};
            vm.radios = {"_id": null, "label": "", "type": "RADIOS", "options": ""}

            vm.curField = null;
            vm.addField = addField;
            vm.findAllFieldsByFormId = findAllFieldsByFormId;
            vm.deleteField=deleteField;
            vm.setCurrentField = setCurrentField;
            vm.getCurrentField = getCurrentField;
            vm.editField = editField;
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
            if(vm.curField.type=='TEXT'){
                vm.textfield.label = vm.curField.label;
                vm.textfield.placeholder = vm.curField.placeholder;
            }else if(vm.curField.type=='TEXTAREA'){
                vm.textareafield.label = vm.curField.label;
                vm.textareafield.placeholder = vm.curField.placeholder;
            }else if(vm.curField.type=='DATE'){
                vm.datefield.label = vm.curField.label;
            }else if(vm.curField.type=='OPTIONS'){
                vm.dropdown.label = vm.curField.label;
                vm.dropdown.options = "";
                for(var i in vm.curField.options){
                    vm.dropdown.options += vm.curField.options[i].label +":"+vm.curField.options[i].value+"\n";
                }
            }else if(vm.curField.type=='CHECKBOXES'){
                vm.checkboxfield.label = vm.curField.label;
                vm.checkboxfield.options = "";
                for(var i in vm.curField.options){
                    vm.checkboxfield.options += vm.curField.options[i].label +":"+vm.curField.options[i].value+"\n";
                }
            }else if(vm.curField.type=='RADIOS'){
                vm.radios.label = vm.curField.label;
                vm.radios.options = "";
                for(var i in vm.curField.options){
                    vm.radios.options += vm.curField.options[i].label +":"+vm.curField.options[i].value+"\n";
                }
            }else{
                vm.emailfield = vm.curField;
            }
        }

        function getCurrentField(){
            return vm.curField;
        }

        function editField(){
            if(vm.curField.type=='TEXT'){
                vm.curField.label = vm.textfield.label;
                vm.curField.placeholder = vm.textfield.placeholder;
            }else if(vm.curField.type=='TEXTAREA'){
                vm.curField.label = vm.textareafield.label;
                vm.curField.placeholder = vm.textareafield.placeholder;
            }else if(vm.curField.type=='DATE'){
                vm.curField.label = vm.datefield.label;
            }else if(vm.curField.type=='OPTIONS'){
                vm.curField.label = vm.dropdown.label;
                vm.curField.options=[];
                var options = vm.dropdown.options.split("\n");
                for(var i=0;i<options.length;i++){
                    var line = options[i].split(":");
                    if(options[i]!==''&&line.length==2) {
                        var option = {"label": line[0], "value": line[1]};
                        vm.curField.options.push(option);
                    }
                }
            }else if(vm.curField.type=='CHECKBOXES'){
                vm.curField.label = vm.checkboxfield.label;
                vm.curField.options=[];
                var options1 = vm.checkboxfield.options.split("\n");
                for(var i=0;i<options1.length;i++){
                    var line = options1[i].split(":");
                    if(options1[i]!==''&&line.length==2) {
                        var option1 = {"label": line[0], "value": line[1]};
                        vm.curField.options.push(option1);
                    }
                }
            }else if(vm.curField.type=='RADIOS'){
                vm.curField.label = vm.radios.label;
                vm.curField.options=[];
                var options2 = vm.radios.options.split("\n");
                for(var i=0;i<options2.length;i++){
                    var line = options2[i].split(":");
                    if(options2[i]!==''&&line.length==2) {
                        var option2 = {"label": line[0], "value": line[1]};
                        vm.curField.options.push(option2);
                    }
                }
            }else{
                vm.curField = vm.emailfield;
            }

            var deferred = $q.defer();

            FieldService
                .updateField($routeParams.formId, vm.curField._id,vm.curField)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        console.log("return");
                        vm.fields = fields;
                        console.log(vm.fields);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            vm.curField = null;
            return deferred.promise;
        }
    }
})();
