function Renderer(universe,viewport) {
    this.stage = new PIXI.Stage(0x000);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);
    this.universe = universe;
    this.viewport = viewport;

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

Renderer.prototype.render = function() {
    //TODO create sprite pool.. iterate over objects, (re)assign sprites
    var shiptexture = PIXI.Texture.fromImage("ship.gif");

    this.renderer.render(this.stage);
    requestAnimFrame( this.update.bind(this) );
}

module.exports = Renderer;
