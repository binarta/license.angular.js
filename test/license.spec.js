describe('license.js', function() {
    var ctrl, $scope, rest, topics, dispatcher;

    beforeEach(module('license'));
    beforeEach(inject(function(restServiceHandler, config) {
        rest = restServiceHandler;
        config.namespace = 'N';
        config.baseUri = 'http://host/';
    }));

    function request() {
        return rest.calls.first().args[0];
    }

    describe('LicenseController', function() {
        var license;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('LicenseController', {$scope:$scope});
            license = {
                id:'license-id'
            };
        }));

        describe('given initialized with license', function() {
            beforeEach(function() {
                $scope.init(license);
            });

            it('test', function() {
                $scope.activate();

                expect(request().params.method).toEqual('POST');
                expect(request().params.url).toEqual('http://host/api/entity/license');
                expect(request().params.data.context).toEqual('activate');
                expect(request().params.data.id).toEqual(license.id);
                expect(request().params.withCredentials).toBeTruthy();
            });
        });
    });
});