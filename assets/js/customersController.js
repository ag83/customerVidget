module.exports = function (CustomerService, $scope) {

    //init
    var vm = this;
    vm.currentPage = 1;
    vm.customers = null;
    vm.showLimit = 5;
    vm.offset = 0;
    vm.init = true;
    vm.pages =0;

    CustomerService.init().then(function() {
        CustomerService.getAll(vm.showLimit, vm.offset).then(function(data) {
            vm.customers = data.matches;
            var total = data.total;
            vm.pages = Math.ceil(total/vm.showLimit);
            vm.init=false;
        });
    });


    //onchange select num
    vm.changeCustNumView = function() {
        if (!vm.init) {
            CustomerService.getAll(vm.showLimit, vm.offset, vm.query).then(function(data) {
                vm.customers = data.matches;
                var total = data.total;
                vm.pages = Math.ceil(total/vm.showLimit);
            }, function(error) {
                console.log(error);
            });
        }
    };

    //onchange page num
    vm.changePage = function() {
        vm.offset = (vm.currentPage-1)*vm.showLimit;
        CustomerService.getAll(vm.showLimit, vm.offset, vm.query).then(function(data) {
            vm.customers = data.matches;
            var total = data.total;
            vm.pages = Math.ceil(total/vm.showLimit);
        }, function(error) {
            console.log(error);
        });
    };

    //search
    vm.customerSearch = function() {
        vm.currentPage = 1;
        vm.changePage();
    };

    $scope.$watch('CC.query', function(newVal, oldVal) {
        if (newVal == '') {
            vm.currentPage = 1;
            vm.changePage();
        }
    }, true);

};