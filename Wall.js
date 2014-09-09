function Wall(x, y, length, angle) {
    this.position = new PIXI.Point(x,y);
    var texture = PIXI.Texture.fromImage("wall.png");
    this.sprite = new PIXI.TilingSprite(texture, 20, length);
    this.sprite.rotation = angle;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = .5;
}

Wall.prototype.update = function(viewport) {
    //this.sprite.visible = this.visible && viewport.isVisible(this);

    this.sprite.x = (viewport.position.x + viewport.width/2) - this.position.x;
    this.sprite.y = (viewport.position.y + viewport.height/2) - this.position.y;
}

