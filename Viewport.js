function Viewport(stage, width, height) {
    this.backgrounds = [];
    this.stage = stage;
    this.position = new PIXI.Point(0,0);
    this.width = width;
    this.height = height;

    this.addBackground(new Background(PIXI.Texture.fromImage("starbg.jpg"),width, height, 1, 1));
}

Viewport.prototype.addBackground = function(bg) {
    this.stage.addChild(bg);
    this.backgrounds.push(bg);
}

Viewport.prototype.setX = function(x) {
    this.position.x = x;
    this.updateBG();
}

Viewport.prototype.setY = function(y) {
    this.position.y = y;
    this.updateBG();
}

Viewport.prototype.updateBG = function() {
    var self = this;
    _.each(this.backgrounds,function(bg) {
        bg.setViewport(self.position.x,self.position.y);
    });
}

Viewport.prototype.move = function(x,y) {
    this.position.x += x;
    this.position.y += y;
    this.updateBG();
}

Viewport.prototype.viewableRectangle = function() {
    return new PIXI.Rectangle(this.position.x - this.width/2,this.position.y - this.height/2, this.width, this.height);
}

Viewport.prototype.isVisible = function(gameobject) {
    return this.viewableRectangle().contains(gameobject.position.x,gameobject.position.y);
}
