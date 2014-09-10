function Background(texture, width, height, parallaxX, parallaxY) {
    PIXI.TilingSprite.call(this, texture, width, height);
    this.parallaxX = parallaxX;
    this.parallaxY = parallaxY;
    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.prototype.setViewportX = function(x) {
    this.tilePosition.x = x*this.parallaxX;
}

Background.prototype.setViewportY = function(y) {
    this.tilePosition.y = y*this.parallaxY;
}

Background.prototype.setViewport = function(x,y) {
    this.setViewportX(x);
    this.setViewportY(y);
}

module.exports = Background;
