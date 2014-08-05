angular.module('license', ['config', 'rest.client', 'angular.usecase.adapter', 'config'])
    .controller('LicenseController', ['$scope', 'usecaseAdapterFactory', 'config', 'restServiceHandler', LicenseController]);

function LicenseController($scope, usecaseAdapterFactory, config, restServiceHandler) {
    var self = this;

    $scope.init = function (license) {
        self.license = license;
    };

    $scope.activate = function () {
        var ctx = usecaseAdapterFactory($scope);

        ctx.params = {
            method: 'POST',
            url: config.baseUri + 'api/entity/license',
            withCredentials: true,
            data: {
                context: 'activate',
                id: self.license.id
            }
        };
//        ctx.success = function (payload) {
//            if (payload.approvalUrl) {
//                $location.search('url', payload.approvalUrl);
//                $location.path(($scope.locale || '') + '/payment-approval');
//            } else $location.path(($scope.locale || '') + '/order-confirmation');
//            basket.clear();
//            addressSelection.clear();
//        };
        restServiceHandler(ctx);
    }
}