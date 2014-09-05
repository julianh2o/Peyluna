function Main() {
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);

    this.viewport = new Viewport(this.stage,400,300);

    var texture = PIXI.Texture.fromImage("ship.gif");

    this.gameObjects = [];

    this.ship = new GameObject(texture,200,150);
    this.addObject(this.ship);
    this.addObject(new GameObject(texture, 100,100));
    this.addObject(new GameObject(PIXI.Texture.fromImage("planet.png"),0,0,.1,.1));

    this.keyMap = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

    var heldKeys = {};
    this.heldKeys = heldKeys;
    $(window).keydown(function(e) {
        heldKeys[e.keyCode] = true;
    });

    $(window).keyup(function(e) {
        heldKeys[e.keyCode] = false;
    });

    requestAnimFrame( this.update.bind(this) );
}

Main.prototype.addObject = function(gameobject) {
    this.gameObjects.push(gameobject);
    this.stage.addChild(gameobject.sprite);
}

Main.prototype.update = function() {
    var self = this;

    //update code
    if (this.heldKeys[this.keyMap.left]) {
        this.ship.rvel = -0.07;
    } else if (this.heldKeys[this.keyMap.right]) {
        this.ship.rvel = 0.07;
    } else {
        this.ship.rvel = 0;
    }
    var vdx=0,vdy=0;

    if (this.heldKeys[this.keyMap.left]) vdx+=-1;
    if (this.heldKeys[this.keyMap.right]) vdx+=1;
    if (this.heldKeys[this.keyMap.up]) vdy+=-1;
    if (this.heldKeys[this.keyMap.down]) vdy+=1;
    if (vdx != 0 || vdy != 0) {
        this.viewport.move(vdx,vdy);
        console.log(this.viewport.position.x,this.viewport.position.y);
    }

    _.each(this.gameObjects,function(go) {
        go.update(self.viewport);
    });
    //end update code

    // render the stage
    this.renderer.render(this.stage);
    requestAnimFrame( this.update.bind(this) );
}
