class Timer {
  private time: number;
  private params: any;
  private callbacks: any;
  private args: any;

  constructor (params: any, args: any, callbacks: any) {
    console.log("Timer constructor() exec");
    var date_obj = new Date();
    console.log(date_obj.toString());
    
    this.time = params[0];
    this.params = params;
    this.callbacks = callbacks;
    this.args = args;
    this.setTimer();
  }

  private setTimer() {
    var self = this;

    // debug print
    console.log("time = " + self.time);

    // set
    this.callbacks.start(this.params, this.args);
    setTimeout(function() {
      if (typeof self.callbacks.end !== "undefined") {
        self.callbacks.end(self.params, self.args);
      }
    }, self.time);
  }
}

