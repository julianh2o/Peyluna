function NetworkManager() {
    this.socket = io.connect("http://"+window.location.hostname+":9000");

    this.socket.on("client",function(data) {
        console.log("client connected!",data);
    });
}

NetworkManager.prototype.onUniverse = function(callback) {
    this.socket.on("universe",callback);
}

module.exports = NetworkManager;
