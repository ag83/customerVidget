module.exports = function ($http) {

    var vm = this;
    vm.token;

    function init() {
        var tokenPromise = $http({
                method: 'POST',
                url: 'http://api.wc22.biz/rest/auth/login',
                data: {"email":"java.script@test.com", "password":"strong_password"}
            }).then(function (response) {
                vm.token = response.data.token;
            }, function(reason) {
                console.log(reason);    
            });
        return tokenPromise;
    }

    function findByQuery(query, limit, offset) {
        if (vm.token) {
            var custPromise = $http({
                method: 'POST',
                url: 'http://api.wc22.biz/rest/search',
                headers: {
                    "Content-Type": "application/json",
                    "X-JWT-Token": vm.token
                },
                data: {"limit":10,"offset":0,"index":"customers", "query": query}
            }).then(function (response) {
                return response.data;
            }, function(reason) {
                console.log(reason);    
            });
            return custPromise;
        } else {
            console.log('Token not found');
        }
    }

    function getAll(limit, offset, query) {
        if(vm.token) {
            var data;
            if (arguments.length === 2) {
                data = {"limit":limit,"offset":offset,"index":"customers"};
            } else if (arguments.length === 3) {
                data = {"limit":limit,"offset":offset,"index":"customers", "query": query};
            }
            var custPromise = $http({
                method: 'POST',
                url: 'http://api.wc22.biz/rest/search',
                headers: {
                    "Content-Type": "application/json",
                    "X-JWT-Token": vm.token
                },
                data: data
            }).then(function (response) {
                return response.data;
            }, function(reason) {
                console.log(reason);    
            });
            return custPromise;
        } else {
            console.log('Token not found');
        }
    }


    return {
        init: init,
        getAll: getAll,
        findByQuery: findByQuery
    };

};