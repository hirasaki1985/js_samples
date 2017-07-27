var CSV = (function () {
    function CSV(file, callback, separetor) {
        if (separetor === void 0) { separetor = ","; }
        this.separetor = separetor;
        this.import(file, callback);
    }
    CSV.prototype.import = function (file, callback) {
        this.csv = file.split("\n");
        for (var line in this.csv) {
            var result = this.lineToArray(this.csv[line], this.separetor);
            if (typeof callback !== "undefined" && typeof callback.line !== "undefined") {
                callback.line(result);
            }
        }
    };
    CSV.prototype.lineToArray = function (line, separetor) {
        var tmp = line.split(separetor);
        return tmp;
    };
    CSV.prototype.getNames = function () {
        return this.csv[0].split(this.separetor);
    };
    CSV.prototype.readline = function (line) {
        console.log("CSV readline() line = " + line + " length = " + this.csv.length);
        if (line >= 0 && line < this.csv.length) {
            return this.lineToArray(this.csv[line], this.separetor);
        }
        return undefined;
    };
    return CSV;
})();
