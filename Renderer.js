var Wall = require("./Wall.js");
var Ship = require("./Ship.js");
var Background = require("./Background.js");

function Renderer(universe,viewport) {
    this.stage = new PIXI.Stage(0x000);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);
    this.universe = universe;
    this.viewport = viewport;
    this.spritePool = {};

    this.activeShip = -1;
    this.activeIndicator = new PIXI.Sprite(PIXI.Texture.fromImage("star.png"));
    this.activeIndicator.anchor.x = .5;
    this.activeIndicator.anchor.y = .5;
    this.activeIndicator.width = 10;
    this.activeIndicator.height = 10;

    this.background = new Background(PIXI.Texture.fromImage("starbg.jpg"),this.viewport.width, this.viewport.height, 1, 1);
    this.stage.addChild(this.background);
    this.stage.addChild(this.activeIndicator);

    this.resize();
    window.addEventListener("resize",this.resize.bind(this),false);
}

Renderer.prototype.setActiveShip = function(shipId) {
    this.activeShip = shipId;
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

Renderer.prototype.getSprite = function(obj) {
    if (!this.spritePool[obj.type]) this.spritePool[obj.type] = [];
    var pool = this.spritePool[obj.type];
    if (pool.length == 0) {
        var sprite = new PIXI.Sprite(this.getTexture(obj));
        sprite.type = obj.type;
        sprite.anchor.x = .5;
        sprite.anchor.y = .5;
        return sprite;
    }
    return pool.shift();
}

Renderer.prototype.requestRender = function() {
    requestAnimFrame(this.render.bind(this));
}

Renderer.prototype.render = function() {
    var self = this;
    var usedSprites = [];
    this.background.setViewport(this.viewport.position.x,this.viewport.position.y);
    _.each(this.universe.objects,function(obj) {
        var sprite = self.getSprite(obj);
        usedSprites.push(sprite);
        self.stage.addChild(sprite);
        sprite.x = (self.viewport.position.x + self.viewport.width/2) - obj.position.x;
        sprite.y = (self.viewport.position.y + self.viewport.height/2) - obj.position.y;
        if (self.activeShip == obj.id) {
            self.activeIndicator.x = sprite.x - 10;
            self.activeIndicator.y = sprite.y - 20;
        }
        sprite.width = obj.size.x;
        sprite.height = obj.size.y;
        sprite.rotation = obj.rotation;
    });

    this.renderer.render(this.stage);

    _.each(usedSprites,function(sprite) {
        self.spritePool[sprite.type].push(sprite);
        self.stage.removeChild(sprite);
    });
}

module.exports = Renderer;
