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

NetworkManager.prototype.onClientInfo = function(callback) {
    this.socket.on("clientinfo",function(str) {
        callback(JSON.parse(str));
    });
}

NetworkManager.prototype.on = function(type,callback,json) {
    this.socket.on(type,function(str) {
        if (json) {
            console.log("str",str);
            callback(JSON.parse(str));
        } else {
            callback(str);
        }
    });
}

NetworkManager.prototype.send = function(type,data) {
    this.socket.emit(type,data);
}

module.exports = NetworkManager;
