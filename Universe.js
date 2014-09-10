var _ = require("underscore");

function Universe() {
    this.objects = [];
}

Universe.prototype.addObject = function(obj) {
    this.objects.push(obj);
}

Universe.prototype.update = function() {
    _.each(this.objects,function(obj) {
        obj.update();
    });
}

module.exports = Universe;
