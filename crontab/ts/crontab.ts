class Crontab {
  private timer: string;
  private callbacks: any;
  private args: any;
  
  constructor (timer: string, callbacks: any, args: any) {
    var date_obj = new Date();
    console.info("Crontab constructor() start");
    console.log(date_obj.toString());
    
    this.timer = timer;
    this.callbacks = callbacks;
    this.args = args;
    this.setTimer();
  }

  private setTimer() {
    var self = this;
    setTimeout(function() {
      self.callbacks.start(self.args);
      self.callbacks.end();
    }, 1000);
  }

  private getTime() {

  }
}