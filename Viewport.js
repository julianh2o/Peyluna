var Rectangle = require("./Rectangle.js");
var Point = require("./Point.js");

function Viewport(stage, width, height) {
    this.backgrounds = [];
    this.stage = stage;
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

Viewport.prototype.addBackground = function(bg) {
    this.stage.addChild(bg);
    this.backgrounds.push(bg);
}

Viewport.prototype.setPosition = function(x,y) {
    this.position.x = x;
    this.position.y = y;
    this.updateBG();
}

Viewport.prototype.move = function(x,y) {
    this.position.x += x;
    this.position.y += y;
    this.updateBG();
}

Viewport.prototype.viewableRectangle = function() {
    return new Rectangle(this.position.x - this.width/2,this.position.y - this.height/2, this.width, this.height);
}

Viewport.prototype.isVisible = function(gameobject) {
    return this.viewableRectangle().contains(gameobject.position.x,gameobject.position.y);
}

module.exports = Viewport;
