var LED = function() {
  this.start = function(name, row, param) {
    var element = document.getElementById(name);
    if (element === null) {
      return;
    }
    element.innerHTML = name;
    element.style.backgroundColor = param;
  };
  this.end = function(name, row, param) {
    var element = document.getElementById(name);
    if (element === null) {
      return;
    }

    // reset
    element.innerHTML = "";
    element.style.backgroundColor = "transparent";
  };
};
var dropAreaId = "importCSV";

var Controller = function(csvFile) {
  console.dir(csvFile);
  this.csv = new CSV(csvFile);

  this.start = function(num) {
    var self = this;
    var num = num || 0;

    this.execLine(num, {
      "start": function(params, args) {
        // debug print
        console.log("Controller execLine() start");
        console.dir(params);
        console.dir(args);
        var date_obj = new Date();
        console.log(date_obj.toString());
        
        // logic
        var names = self.csv.getNames();
        for (var i = 1; i < params.length; i++) {
          var led = new LED();
          led.start(names[i], num, params[i]);
        }
      },
      "end": function(params, args) {
        // debug print
        console.log("Controller execLine() end");
        var date_obj = new Date();
        console.log(date_obj.toString());

        // logic
        var names = self.csv.getNames();
        for (var i = 1; i < params.length; i++) {
          var led = new LED();
          led.end(names[i], num, params[i]);
        }

        // next row
        self.start(num + 1);
      }
    });
  }

  this.execLine = function(num, callbacks) {
    var self = this;
    num = num || 0;

    console.info("Controller execLine() start");
    console.log("num = " + num);

    // read csv
    var line = this.csv.readline(num);
    console.dir(line);

    // validate
    if (typeof line === "undefined") {
      console.log("line is undefined");
      return undefined;
    }

    // timer set
    var args = {"num":num};
    var timer = new Timer(line, args, callbacks);

    return num;
  };
}

window.onload = function () {
  var self = this;

  this.exec = function(csvFile) {
    var controller = new Controller(csvFile);
    controller.start(1);
  }

  this.setTrigger = function() {
    var element = document.getElementById(dropAreaId);
    var self = this;

    element.addEventListener('dragover', function(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
    
    element.addEventListener('dragleave', function(event) {
    });

    element.addEventListener('drop', function(event) {
      event.preventDefault();
      var files = event.dataTransfer.files;
      console.log(files);

      for (var i=0; i < files.length; i++) {
        var reader = new FileReader();
        var file = files[i];

        console.log(file.name);
        reader.onload = function(event) {
          var data = event.target.result;
          console.log(data);
          self.exec(data);
        }
        reader.readAsText(file);
      }
    });
  };
  setTrigger();
}