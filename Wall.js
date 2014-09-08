function Wall(x, y, x1, y1, width) {
    this.position = new PIXI.Point(x,y);
    this.g = new PIXI.Graphics();
    this.g.beginFill(0xffffff);
    this.g.lineStyle(5,0xffffff);
    this.g.moveTo(x,y);
    this.g.lineTo(x1,y1);
    this.g.endFill();
}

Wall.prototype.update = function(viewport) {
    //this.sprite.visible = this.visible && viewport.isVisible(this);

    this.g.x = (viewport.position.x + viewport.width/2) - this.position.x;
    this.g.y = (viewport.position.y + viewport.height/2) - this.position.y;
}

