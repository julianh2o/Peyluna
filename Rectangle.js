var Point = require("./Point.js");

function Rectangle(x,y,width,height) {
    this.position = new Point(x,y);
    this.size = new Point(width,height);
}

module.exports = Rectangle;
