(function () {
    'use strict';

    angular.module('components')
            .directive('scientillaToolbar', scientillaToolbar);
    
    function scientillaToolbar() {
        return {
            restrict: 'E',
            templateUrl: 'partials/scientillaToolbar.html',
            controller: scientillaToolbarController,
            controllerAs: 'vm',
            scope: {
            }
        };
    }
    
    function scientillaToolbarController($scope, AuthService) {
        var vm = this;

        $scope.$on('LOGIN', refresh);
        $scope.$on('LOGOUT', refresh);

        function refresh() {
            vm.isLogged = AuthService.isLogged;
            vm.userId = AuthService.userId;
        }
    }

})();