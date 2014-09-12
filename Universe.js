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
    var self = this;
    _.each(this.objects,function(go) {
        var previousPosition = _.clone(go.position);
        var previousVelocity = _.clone(go.velocity);
        go.update();
        _.each(self.objects,function(go2) {
            if (go === go2) return;
            if (go.type == "Ship" && go.collisionImmunity == 0 && go2.type == "Wall" && go.collidesWith(go2)) {
                go.position = previousPosition;
                go.collisionImmunity = 4;
                if (go2.rotation == 0) {
                    go.velocity.x = -go.velocity.x*.5;
                } else {
                    go.velocity.y = -go.velocity.y*.5;
                }
            }
        });
    });
}

module.exports = Universe;
