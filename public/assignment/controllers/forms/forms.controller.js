/**
 * Created by wendy on 2/16/16.
 */
(function(){
    angular
        .module('FormBuilderApp')
        .controller('FormController', ['$scope','$rootScope','FormService',FormController]);

    function FormController($scope,$rootScope,FormService){
        $scope.forms=[];
        $scope.newform = { _id:0, title:" ", userId:""};
        console.log("FormController");

        FormService.findAllFormsForUser($rootScope.newUser._id,function(matchForms){
            $scope.forms = matchForms;
        })

        $scope.addForm = function(){
            FormService.createFormForUser($rootScope.newUser._id,$scope.newform,function(form){
                $scope.forms.push(form);
                $scope.newform = { _id:0, title:" ", userId:""};
            });
            console.log($scope.forms);
        }

        $scope.updateForm = function(){
            FormService.updateFormById($scope.newform._id,$scope.newform,function(newform){
                $scope.newform = { _id:0, title:" ", userId:""};
            });
            console.log($scope.forms);
        }

        $scope.deleteForm = function(index){
            FormService.deleteFormById($scope.forms[index]._id,function(forms){
                FormService.findAllFormsForUser($rootScope.newUser._id,function(forms){
                    $scope.forms = forms;
                })
                $scope.newform = { _id:0, title:" ", userId:""};
            });

            console.log($scope.forms);
        }

        $scope.selectForm = function(index){
            $scope.newform._id= $scope.forms[index]._id;
            $scope.newform.title= $scope.forms[index].title;
            $scope.newform.userId= $scope.forms[index].userId;
        }
    }
})();