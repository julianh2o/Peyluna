var Universe = require("./Universe.js");
var Wall = require("./Wall.js");
var Ship = require("./Ship.js");

var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require("underscore");

var universe = new Universe();
var mapWidth = 500;
var mapHeight = 500;
for (var i=0; i<=mapWidth; i+=20) {
    universe.addObject(new Wall(i-mapWidth/2,mapHeight/2));
    universe.addObject(new Wall(i-mapWidth/2,-mapHeight/2));
    universe.objects[universe.objects.length-1].rotation = Math.PI/2;
    universe.objects[universe.objects.length-2].rotation = Math.PI/2;
}

for (var i=0; i<=mapHeight; i+=20) {
    universe.addObject(new Wall(mapWidth/2,i-mapHeight/2));
    universe.addObject(new Wall(-mapWidth/2,i-mapHeight/2));
}

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
 
app.use(allowCrossDomain);

var clients = [];
function emitAll(type,data) {
    _.each(clients,function(client) {
        client.emit(type,data);
    });
}
io.on("connection",function(socket) {
    clients.push(socket);

    socket.heldKeys = {};
    socket.on("keydown",function(key) {
        socket.heldKeys[key] = true;
    });

    socket.on("keyup",function(key) {
        socket.heldKeys[key] = false;
    });

    var ip = socket.handshake.address;
    emitAll("client",ip);

    var ship = new Ship(clients.length-1)
    socket.ship = ship;
    emitAll("objectAdded",ship);
    universe.addObject(ship);
    socket.emit("universe",JSON.stringify(universe));
    socket.emit("clientinfo",JSON.stringify({
        clientId: clients.length-1,
        shipId: ship.id
    }));

    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        clients.splice(index, 1);
        universe.removeObject(ship);
        emitAll("objectRemoved",ship.id);
        console.log("client disconnected");
    });

    console.log("user connected!");
});

var keyMap = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

setInterval(function() {
    _.each(clients,function(client) {
        if (client.heldKeys[keyMap.left]) {
            client.ship.rvel = -.07;
        } else if (client.heldKeys[keyMap.right]) {
            client.ship.rvel = .07;
        } else {
            client.ship.rvel = 0;
        }

        if (client.heldKeys[keyMap.up]) {
            var thrustPower = .1;
            client.ship.velocity.x -= Math.sin(client.ship.rotation) * thrustPower;
            client.ship.velocity.y += Math.cos(client.ship.rotation) * thrustPower;
        }
    });

    universe.update();

    _.each(clients,function(client) {
        _.each(universe.objects,function(object) {
            if (object.type == "Ship") {
                client.emit("update",JSON.stringify(object));
            }
        });
    });
},10);

http.listen(9000,function() {
    console.log("Server is listening...");
});
