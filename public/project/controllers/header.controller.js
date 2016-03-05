/**
 * Created by wendy on 3/4/16.
 */
(function () {
    angular
        .module('MovieFanApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        console.log("HeaderController");

        $scope.logout = function () {
            $rootScope.curUser = {"_id": 0, "username": "", "password": "", "roles": []};
        },
            $scope.islogin = function () {
                return !($rootScope.curUser._id === 0);
            },

            $scope.getUserName = function () {
                return $rootScope.curUser.username;
            }
    }
})();
