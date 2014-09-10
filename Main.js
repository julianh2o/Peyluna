var NetworkManager = require("./NetworkManager.js");
var Universe = require("./Universe.js");
var Renderer = require("./Renderer.js");
var Viewport = require("./Viewport.js");

function Main() {
    var self = this;
    this.network = new NetworkManager();
    this.viewport = new Viewport();
    this.network.onUniverse(this.onUniverse.bind(this));

    /*
    this.viewport = new Viewport(this.stage,400,300);
    this.viewport.position.x = 50;
    this.viewport.position.y = 50;

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
    */
}

Main.prototype.onUniverse = function(universe) {
    this.universe = universe;
    this.renderer = new Renderer(this.universe,this.viewport);
    console.log("universe rec",universe);
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
    //end update code
}

window.Main = Main;
