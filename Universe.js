var _ = require("underscore");

function Universe() {
    this.objects = [];
}

Universe.prototype.addObject = function(obj) {
    this.objects.push(obj);
}

Universe.prototype.removeObject = function(obj) {
    this.objects = _.reject(this.objects,function(item) {
        return item.id == obj.id;
    });
}

Universe.prototype.update = function() {
    _.each(this.objects,function(obj) {
        obj.update();
    });
}

module.exports = Universe;
