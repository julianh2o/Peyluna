function GameObject(texture, x, y, scaleX, scaleY) {
    this.position = new PIXI.Point(x,y);
    this.velocity = new PIXI.Point(x,y);
    this.rvel = 0;

    this.visible = true;
    this.sprite = new PIXI.Sprite(texture);
    if (scaleX) this.sprite.scale.x = scaleX;
    if (scaleY) this.sprite.scale.y = scaleY;

    this.sprite.anchor.x = .5;
    this.sprite.anchor.y = .5;
}

GameObject.prototype.update = function(viewport) {
    this.x += this.xvel;
    this.y += this.yvel;
    this.sprite.rotation += this.rvel;

    //this.sprite.visible = this.visible && viewport.isVisible(this);

    this.sprite.x = -(viewport.position.x - viewport.width/2) - this.position.x;
    this.sprite.y = -(viewport.position.y - viewport.height/2) - this.position.y;
}
