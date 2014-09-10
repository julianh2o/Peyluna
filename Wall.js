var GameObject = require("./GameObject.js");

function Wall(x, y) {
    GameObject.call(this, x, y, 20, 20);
}

Wall.constructor = Wall;
Wall.prototype = Object.create(GameObject);

module.exports = Wall;
