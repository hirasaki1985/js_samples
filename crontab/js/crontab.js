var Crontab = (function () {
    function Crontab(timer, callbacks, args) {
        var date_obj = new Date();
        console.info("Crontab constructor() start");
        console.log(date_obj.toString());
        this.timer = timer;
        this.callbacks = callbacks;
        this.args = args;
        this.setTimer();
    }
    Crontab.prototype.setTimer = function () {
        var self = this;
        setTimeout(function () {
            self.callbacks.start(self.args);
            self.callbacks.end();
        }, 1000);
    };
    Crontab.prototype.getTime = function () {
    };
    return Crontab;
})();
