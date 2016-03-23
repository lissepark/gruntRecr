module VMPL {
    describe('HomepageCtrl', () => {

        let homepageCtrl;

        beforeEach(() => {
            angular.mock.module('vmpl');

            homepageCtrl = new VMPL.HomepageCtrl();
        });


        describe('constructor', () => {
            it('should set property title value', () => {
                expect(homepageCtrl.title).toEqual('Homepage vm.pl');
            });
        });

    });

}