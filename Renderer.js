var Wall = require("./Wall.js");
var Ship = require("./Ship.js");
var Background = require("./Background.js");

function Renderer(universe,viewport) {
    this.stage = new PIXI.Stage(0x000);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);
    this.universe = universe;
    this.viewport = viewport;
    this.spriteAssignment = {};
    this.spritePool = [];

    this.background = new Background(PIXI.Texture.fromImage("starbg.jpg"),this.viewport.width, this.viewport.height, 1, 1);
    this.stage.addChild(this.background);

    this.resize();
    window.addEventListener("resize",this.resize.bind(this),false);
}

Renderer.prototype.resize = function() {
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    this.viewport.width = screenWidth;
    this.viewport.height = screenHeight;
    this.background.width = screenWidth;
    this.background.height = screenHeight;
    this.renderer.resize(screenWidth,screenHeight);
}

Renderer.prototype.getTexture = function(obj) {
    if (obj.type == "Wall") return PIXI.Texture.fromImage("wall.png");
    if (obj.type == "Ship") return PIXI.Texture.fromImage("ship.gif");
}

Renderer.prototype.requestRender = function() {
    requestAnimFrame(this.render.bind(this));
}

Renderer.prototype.render = function() {
    var self = this;
    this.background.setViewport(this.viewport.position.x,this.viewport.position.y);
    _.each(this.universe.objects,function(obj) {
        var sprite = self.spriteAssignment[obj.id];
        if (!sprite) {
            sprite = new PIXI.Sprite(self.getTexture(obj));
            sprite.anchor.x = .5;
            sprite.anchor.y = .5;
            self.spriteAssignment[obj.id] = sprite;
            self.stage.addChild(sprite);
        }
        sprite.x = (self.viewport.position.x + self.viewport.width/2) - obj.position.x;
        sprite.y = (self.viewport.position.y + self.viewport.height/2) - obj.position.y;
        sprite.width = obj.size.x;
        sprite.height = obj.size.y;
        sprite.rotation = obj.rotation;
    });
    //TODO create sprite pool.. iterate over objects, (re)assign sprites
    //var shiptexture = PIXI.Texture.fromImage("ship.gif");

    this.renderer.render(this.stage);
}

module.exports = Renderer;
