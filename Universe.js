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
