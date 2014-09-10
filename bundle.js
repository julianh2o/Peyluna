(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/Peyluna/Main.js":[function(require,module,exports){
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

},{"./NetworkManager.js":"/var/www/Peyluna/NetworkManager.js","./Renderer.js":"/var/www/Peyluna/Renderer.js","./Universe.js":"/var/www/Peyluna/Universe.js","./Viewport.js":"/var/www/Peyluna/Viewport.js"}],"/var/www/Peyluna/NetworkManager.js":[function(require,module,exports){
function NetworkManager() {
    this.socket = io.connect("http://"+window.location.hostname+":9000");

    this.socket.on("client",function(data) {
        console.log("client connected!",data);
    });
}

NetworkManager.prototype.onUniverse = function(callback) {
    this.socket.on("universe",callback);
}

module.exports = NetworkManager;

},{}],"/var/www/Peyluna/Point.js":[function(require,module,exports){
function Point(x,y) {
    this.x = x;
    this.y = y;
}

module.exports = Point;

},{}],"/var/www/Peyluna/Rectangle.js":[function(require,module,exports){
function Rectangle(x,y,width,height) {
    this.position = new Point(x,y);
    this.size = new Point(width,height);
}

module.exports = Rectangle;

},{}],"/var/www/Peyluna/Renderer.js":[function(require,module,exports){
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

},{}],"/var/www/Peyluna/Universe.js":[function(require,module,exports){
(function (global){
function Universe() {
    this.objects = [];
}

Universe.prototype.addObject = function(obj) {
    this.objects.push(obj);
}

Universe.prototype.update = function() {

}

if (typeof global !== "undefined") module.exports = Universe;


module.exports = Universe;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/var/www/Peyluna/Viewport.js":[function(require,module,exports){
var Rectangle = require("./Rectangle.js");
var Point = require("./Point.js");

function Viewport(stage, width, height) {
    this.backgrounds = [];
    this.stage = stage;
    this.position = new Point(0,0);
    this.width = width;
    this.height = height;
}

Viewport.prototype.resize = function(x,y) {
    this.width = x;
    this.height = y;

    _.each(this.backgrounds,function(bg) {
        bg.width = x;
        bg.height = y;
    });
}

Viewport.prototype.addBackground = function(bg) {
    this.stage.addChild(bg);
    this.backgrounds.push(bg);
}

Viewport.prototype.setPosition = function(x,y) {
    this.position.x = x;
    this.position.y = y;
    this.updateBG();
}

Viewport.prototype.move = function(x,y) {
    this.position.x += x;
    this.position.y += y;
    this.updateBG();
}

Viewport.prototype.viewableRectangle = function() {
    return new Rectangle(this.position.x - this.width/2,this.position.y - this.height/2, this.width, this.height);
}

Viewport.prototype.isVisible = function(gameobject) {
    return this.viewableRectangle().contains(gameobject.position.x,gameobject.position.y);
}

module.exports = Viewport;

},{"./Point.js":"/var/www/Peyluna/Point.js","./Rectangle.js":"/var/www/Peyluna/Rectangle.js"}]},{},["/var/www/Peyluna/Main.js"]);
