var GameObject = require("./GameObject.js");

function Ship(controller) {
    GameObject.call(this, 0, 0, 30, 30,0);
    this.type = "Ship";
    this.controller = controller;
}

Ship.constructor = Ship;
Ship.prototype = Object.create(GameObject.prototype);

module.exports = Ship;
