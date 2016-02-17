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
    }
})();

