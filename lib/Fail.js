colors = require('colors');

var Fail = function() {
    this.msg = "";
    this.title = "";
    this.code = "";
};

Fail.prototype.print = function(msg) {
    msg = msg || "Error: ";
    console.log(msg.red);
};

module.exports = Fail; 