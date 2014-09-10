function NetworkManager() {
    this.socket = io.connect("http://"+window.location.hostname+":9000");

    this.socket.on("client",function(data) {
        console.log("client connected!",data);
    });
}
