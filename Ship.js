var GameObject = require("./GameObject.js");

function Ship(controller) {
    this.controller = controller;
}

Ship.constructor = Ship;
Ship.prototype = Object.create(GameObject);

module.exports = Ship;
