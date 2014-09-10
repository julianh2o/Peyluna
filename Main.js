var NetworkManager = require("./NetworkManager.js");
var Universe = require("./Universe.js");
var GameObject = require("./GameObject.js");
var Renderer = require("./Renderer.js");
var Viewport = require("./Viewport.js");

function Main() {
    var self = this;
    this.network = new NetworkManager();
    this.viewport = new Viewport();
    this.network.onUniverse(this.onUniverse.bind(this));
    this.network.onUpdate(this.onUpdate.bind(this));

    this.keyMap = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

    $(window).keydown(function(e) {
        self.network.send("keydown",e.keyCode);
    });

    $(window).keyup(function(e) {
        self.network.send("keyup",e.keyCode);
    });

    setInterval(this.update.bind(this),10);
}

Main.prototype.onUniverse = function(universe) {
    this.universe = universe;
    this.universe.__proto__ = Universe.prototype;
    _.each(this.universe.objects,function(obj) {
        obj.__proto__ = GameObject.prototype;
    });
    console.log("object count: ",this.universe.objects.length);
    this.renderer = new Renderer(this.universe,this.viewport);
    this.renderer.requestRender();
}

Main.prototype.onUpdate = function(obj) {
    obj.__proto__ = GameObject.prototype;
    for (var i=0; i<this.universe.objects.length; i++) {
        if (this.universe.objects[i].id == obj.id) {
            this.universe.objects[i] = obj;
        }
    }
}

Main.prototype.update = function() {
    var self = this;

    if (this.universe) this.universe.update();

    //update code
    /*
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
    */

    /*
    _.each(this.gameObjects,function(go) {
        var previousPosition = _.clone(go.position);
        var previousVelocity = _.clone(go.velocity);
        go.update(self.viewport);
        _.each(self.gameObjects,function(go2) {
            if (go === go2) return;
            if (go === self.ship && go.collisionImmunity == 0 && go2 instanceof Wall && go.collidesWith(go2.sprite)) {
                go.position = previousPosition;
                go.collisionImmunity = 4;
                if (go2.sprite.rotation == 0) {
                    go.velocity.x = -go.velocity.x*.5;
                } else {
                    go.velocity.y = -go.velocity.y*.5;
                }
            }
        });
    });
    */
    //end update code
    
    /*
    var vdx=0,vdy=0;
    if (this.heldKeys[this.keyMap.left]) vdx+=-1;
    if (this.heldKeys[this.keyMap.right]) vdx+=1;
    if (this.heldKeys[this.keyMap.up]) vdy+=-1;
    if (this.heldKeys[this.keyMap.down]) vdy+=1;
    if (vdx != 0 || vdy != 0) {
        this.viewport.move(vdx,vdy);
        //console.log(this.viewport.position.x,this.viewport.position.y);
    }
    */

    if (this.renderer) this.renderer.requestRender();
}

window.Main = Main;
