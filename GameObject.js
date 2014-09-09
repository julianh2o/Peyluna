function GameObject(texture, x, y, scaleX, scaleY) {
    this.position = new PIXI.Point(x,y);
    this.velocity = new PIXI.Point(0,0);
    this.rvel = 0;
    this.collisionImmunity = 0;

    this.visible = true;
    this.sprite = new PIXI.Sprite(texture);
    if (scaleX) this.sprite.scale.x = scaleX;
    if (scaleY) this.sprite.scale.y = scaleY;

    this.sprite.anchor.x = .5;
    this.sprite.anchor.y = .5;
}

GameObject.prototype.collidesWith = function(sprite) {
    return Util.rectangleCollision(this.sprite.getBounds(),sprite.getBounds());
}

GameObject.prototype.update = function(viewport) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sprite.rotation += this.rvel;
    if (this.collisionImmunity > 0) this.collisionImmunity--;

    //this.sprite.visible = this.visible && viewport.isVisible(this);

    this.sprite.x = (viewport.position.x + viewport.width/2) - this.position.x;
    this.sprite.y = (viewport.position.y + viewport.height/2) - this.position.y;
}

