module VMPL {
    export class HomepageCtrl {
        public title:string = 'Homepage vm.pl';
        public rate:number = 7;
        public max:number = 10;
        public percent:number = 0;
        public overStar:any = null;

        public hoveringOver(value) {
            this.overStar = value;
            this.percent = 100 * (value / this.max);
        };
    }
}

angular.module('vmpl')
    .factory('RatingService', [function() {
        return new VMPL.HomepageCtrl();
    }])
    .controller('HomepageCtrl', ['RatingService', function (RatingService) {
        this.service = RatingService;
    }]);
