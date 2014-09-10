var Point = require("./Point.js");
var Rectangle = require("./Rectangle.js");

function GameObject(x, y, sizeX, sizeY, rotation) {
    this.position = new Point(x,y);
    this.velocity = new Point(0,0);
    this.size = new Point(sizeX,sizeY);
    this.rotation = rotation;
    this.rvel = 0;
    this.collisionImmunity = 0;
}

GameObject.prototype.collidesWith = function(object) {
    return Util.rectangleCollision(this.getBoundingRectangle(),object.getBoundingRectangle());
}

GameObject.prototype.getBoundingRectangle = function() {
    return new Rectangle(this.position.x,this.position.y,this.size.x,this.size.y);
}

GameObject.prototype.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sprite.rotation += this.rvel;
    if (this.collisionImmunity > 0) this.collisionImmunity--;

    //this.sprite.visible = this.visible && viewport.isVisible(this);
}

module.exports = GameObject;
