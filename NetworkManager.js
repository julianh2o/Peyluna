function NetworkManager() {
    this.socket = io.connect("http://"+window.location.hostname+":9000");

    this.socket.on("client",function(data) {
        console.log("client connected!",data);
    });
}

NetworkManager.prototype.onUniverse = function(callback) {
    this.socket.on("universe",function(str) {
        callback(JSON.parse(str));
    });
}

NetworkManager.prototype.onUpdate = function(callback) {
    this.socket.on("update",function(str) {
        callback(JSON.parse(str));
    });
}

NetworkManager.prototype.send = function(type,data) {
    this.socket.emit(type,data);
}

module.exports = NetworkManager;
