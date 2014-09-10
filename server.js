var Universe = require("./Universe.js");
var Wall = require("./Wall.js");

var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require("underscore");

var universe = new Universe();
var mapWidth = 500;
var mapHeight = 500;
for (var i=0; i<mapWidth; i++) {
    universe.addObject(new Wall(i,mapHeight));
    universe.addObject(new Wall(i,-mapHeight));
}

for (var i=0; i<mapHeight; i++) {
    universe.addObject(new Wall(mapWidth,i));
    universe.addObject(new Wall(-mapWidth,i));
}

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
 
app.use(allowCrossDomain);

var clients = [];
io.on("connection",function(socket) {
    clients.push(socket);
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log("client disconnected");
    });

    var ip = socket.handshake.address;
    _.each(clients,function(client) {
        client.emit('client',ip);
    });

    socket.emit("universe",JSON.stringify(universe));

    console.log("user connected!");
});

http.listen(9000,function() {
    console.log("Server is listening...");
});
