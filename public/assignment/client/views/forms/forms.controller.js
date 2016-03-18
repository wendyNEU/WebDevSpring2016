/**
 * Created by wendy on 2/16/16.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($q, $route,$location,FormService, UserService) {
        console.log("FormController");

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.$route = $route;
            vm.forms = [];
            vm.newform = {title: " "};
            findAllFormsForUser();
            vm.findAllFormsForUser = findAllFormsForUser;
            vm.createFormForUser = createFormForUser;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;
        }

        init();

        function findAllFormsForUser() {
            var userId = UserService.getCurrentUser()._id;

            var deferred = $q.defer();

            FormService
                .findAllFormsForUser(userId)
                .then(function (response) {
                    var forms = response.data;
                    if (forms) {
                        vm.forms = forms;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function createFormForUser() {
            vm.newform.userId = UserService.getCurrentUser()._id;
            var deferred = $q.defer();
            FormService
                .createFormForUser(vm.newform.userId, vm.newform)
                .then(function (response) {
                    var form = response.data;
                    if (form) {
                        vm.newform = {title: " "};
                        vm.forms.push(form);
                        deferred.resolve();
                    } else {
                        alert("Create Form Fail");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function updateForm() {
            var deferred = $q.defer();
            FormService
                .updateFormById(vm.newform._id, vm.newform)
                .then(function (response) {
                    var forms = response.data;
                    if (forms) {
                        vm.newform = {title: " "};
                        vm.findAllFormsForUser();
                        deferred.resolve();
                    } else {
                        alert("Update Form Fail");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function deleteForm(index) {
            var deferred = $q.defer();
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function (response) {
                    var forms = response.data;
                    if (forms) {
                        vm.newform = {title: " "};
                        vm.findAllFormsForUser();
                        deferred.resolve();
                    } else {
                        alert("Delete Form Fail");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function selectForm(index) {
            vm.newform = vm.forms[index];
        }
    }
})();