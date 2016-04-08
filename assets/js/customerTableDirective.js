module.exports = function () {
    return {
        restrict: 'A',
        templateUrl: '/table.html',
        link: function ($scope, element, attr) {

            $('.selectpicker').selectpicker({
                style: 'btn-default'
            });

            $scope.$watch('CC.showLimit', function() {
                console.log($scope.CC.showLimit)
                $scope.CC.changeCustNumView();
            });
        }
    }

};