var Wall = require("./Wall.js");
var Ship = require("./Ship.js");

function Renderer(universe,viewport) {
    this.stage = new PIXI.Stage(0x000);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);
    this.universe = universe;
    this.viewport = viewport;
    this.spriteAssignment = {};
    this.spritePool = [];

    //this.addBackground(new Background(PIXI.Texture.fromImage("starbg.jpg"),width, height, 1, 1));

    this.resize();
    window.addEventListener("resize",this.resize.bind(this),false);
}

Renderer.prototype.resize = function() {
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    this.renderer.resize(screenWidth,screenHeight);
    //this.viewport.resize(screenWidth,screenHeight);
}

Renderer.prototype.getTexture = function(obj) {
    if (obj instanceof Wall) return PIXI.Texture.fromImage("wall.png");
    if (obj instanceof Ship) return PIXI.Texture.fromImage("ship.gif");
}

Renderer.prototype.render = function() {
    var self = this;
    _.each(this.universe.objects,function(obj) {
        var sprite = this.spriteAssignment[obj];
        if (!sprite) sprite = new PIXI.Sprite(self.getTexture(obj));
        sprite.x = (self.viewport.position.x + self.viewport.width/2) - obj.position.x;
        sprite.y = (self.viewport.position.y + self.viewport.height/2) - obj.position.y;
        sprite.rotation = obj.rotation;
    });
    //TODO create sprite pool.. iterate over objects, (re)assign sprites
    var shiptexture = PIXI.Texture.fromImage("ship.gif");

    this.renderer.render(this.stage);
    requestAnimFrame( this.update.bind(this) );
}

module.exports = Renderer;
