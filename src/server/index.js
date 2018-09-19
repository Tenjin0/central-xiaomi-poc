const express = require("express")

const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get("/", (req, res) => {
    console.log("Hello World central")
    res.send("Hello World central")
})

const listener = http.listen(3000, () => {
    console.log(`Central listening port ${listener.address().port}`)
})

var nsp = io.of('/xiaomisecurity');

nsp.on("central.init", function(value) {
    console.log("nsp", "central.init", value)
})

nsp.on('connection', function(socket) {
    console.log('a user connected');
    
    socket.on('central.init', function() {
        console.log("on", "central.init")
        socket.emit("xiaomihome.devices")
    })
    
    socket.emit("central.init", ["xiaomihome.devices"], ["xiaomihome.gateway.read"])
  
    socket.on("xiaomihome.devices", (data) => {
        console.log("xiaomihome.devices", data)
    })

    socket.on("xiaomihome.gateway.read", (data, device) => {
        console.log("xiaomihome.gateway.read", data, device)
        if (device.model === "magnet" && device.event === "open") {
            
        }
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    })

})
  