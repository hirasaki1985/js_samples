class CSV {
  private csv: any;
  private separetor: string;

  constructor (file: string, callback: any, separetor: string = ",") {
    this.separetor = separetor;
    this.import(file, callback);
  }

  public import(file:string, callback: any) {
    this.csv = file.split("\n");
    for (var line in this.csv) {
      var result = this.lineToArray(this.csv[line], this.separetor);
      if (typeof callback !== "undefined" && typeof callback.line !== "undefined") {
        callback.line(result);
      }
    }
  }
  private lineToArray(line: string, separetor: string) {
    var tmp = line.split(separetor);
    return tmp;
  }

  public getNames() {
    return this.csv[0].split(this.separetor);
  }

  public readline(line: number) {
    console.log("CSV readline() line = " + line + " length = " + this.csv.length);
    if (line >= 0 && line < this.csv.length) {
      return this.lineToArray(this.csv[line], this.separetor);
    }
    return undefined;
  }
}
