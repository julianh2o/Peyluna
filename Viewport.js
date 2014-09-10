var Rectangle = require("./Rectangle.js");
var Point = require("./Point.js");

function Viewport(width, height) {
    this.backgrounds = [];
    this.position = new Point(0,0);
    this.width = width;
    this.height = height;
}

Viewport.prototype.resize = function(x,y) {
    this.width = x;
    this.height = y;

    _.each(this.backgrounds,function(bg) {
        bg.width = x;
        bg.height = y;
    });
}

Viewport.prototype.setPosition = function(x,y) {
    this.position.x = x;
    this.position.y = y;
}

Viewport.prototype.move = function(x,y) {
    this.position.x += x;
    this.position.y += y;
}

Viewport.prototype.viewableRectangle = function() {
    return new Rectangle(this.position.x - this.width/2,this.position.y - this.height/2, this.width, this.height);
}

Viewport.prototype.isVisible = function(gameobject) {
    return this.viewableRectangle().contains(gameobject.position.x,gameobject.position.y);
}

module.exports = Viewport;
