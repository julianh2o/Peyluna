function Main() {
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = PIXI.autoDetectRenderer(400, 300);
    document.body.appendChild(this.renderer.view);

    this.viewport = new Viewport(this.stage,400,300);
    this.viewport.position.x = 50;
    this.viewport.position.y = 50;

    var texture = PIXI.Texture.fromImage("ship.gif");

    this.gameObjects = [];

    this.ship = new GameObject(texture,0,0);
    this.ship.position.x = 50;
    this.ship.position.y = 50;
    this.addObject(new GameObject(PIXI.Texture.fromImage("planet.png"),0,0,.1,.1));
    this.addObject(this.ship);

    var dimensions = new PIXI.Point(500,500);
    this.addObject(new Wall(dimensions.x,dimensions.y,-dimensions.x,dimensions.y));

    /*
    var star = new PIXI.Sprite(new PIXI.Texture.fromImage("star.png"));
    star.anchor.x = .5;
    star.anchor.y = .5;
    star.x = 200;
    star.y = 50;
    this.stage.addChild(star);
    */


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

Main.prototype.addObject = function(obj) {
    if (obj instanceof GameObject) {
        this.gameObjects.push(obj);
        this.stage.addChild(obj.sprite);
    } else if (obj instanceof Wall) {
        this.gameObjects.push(obj);
        this.stage.addChild(obj.g);
    }
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
    if (this.heldKeys[this.keyMap.up]) {
        var thrustPower = .1;
        this.ship.velocity.x -= Math.sin(this.ship.sprite.rotation) * thrustPower;
        this.ship.velocity.y += Math.cos(this.ship.sprite.rotation) * thrustPower;
    }

    this.viewport.setPosition(this.ship.position.x,this.ship.position.y);

    /*
    var vdx=0,vdy=0;
    if (this.heldKeys[this.keyMap.left]) vdx+=-1;
    if (this.heldKeys[this.keyMap.right]) vdx+=1;
    if (this.heldKeys[this.keyMap.up]) vdy+=-1;
    if (this.heldKeys[this.keyMap.down]) vdy+=1;
    if (vdx != 0 || vdy != 0) {
        this.viewport.move(vdx,vdy);
        console.log(this.viewport.position.x,this.viewport.position.y);
    }
    */

    _.each(this.gameObjects,function(go) {
        go.update(self.viewport);
    });
    //end update code

    // render the stage
    this.renderer.render(this.stage);
    requestAnimFrame( this.update.bind(this) );
}
