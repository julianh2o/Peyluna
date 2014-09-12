function Util() {

}

Util.rectangleCollision = function(a,b) {
    if (a.position.x > b.position.x+b.size.x) return false; //missed left
    if (a.position.x+a.size.x < b.position.x) return false; //missed right
    if (a.position.y > b.position.y+b.size.y) return false; //missed up
    if (a.position.y+a.size.y < b.position.y) return false; //missed down
    return true;
}

module.exports = Util;
