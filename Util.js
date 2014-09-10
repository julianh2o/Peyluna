function Util() {

}

Util.rectangleCollision = function(a,b) {
    if (a.x > b.x+b.width) return false; //missed left
    if (a.x+a.width < b.x) return false; //missed right
    if (a.y > b.y+b.height) return false; //missed up
    if (a.y+a.height < b.y) return false; //missed down
    return true;
}
