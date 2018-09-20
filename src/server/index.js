const express = require("express")
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


// var ioClient = require('socket.io-client')

// var socketClient = ioClient('https://localhost:9963', {
//     rejectUnauthorized: false
// });
//     socketClient.on('connect', function(){
//         console.log("connect");
//     });
//     socketClient.on('connect_error', function(){
//         console.log("connect_error");
//     });
//     socketClient.on('event', function(data){
//         console.log("event")
//     });
//     socketClient.on('disconnect', function(){
//         console.log("disconnect")
//     });
//     socketClient.on('error', function(){
//         console.log("disconnect")
//     })

app.use(express.static('public'));

app.get("/", (req, res) => {
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

    socket.on("xiaomihome.devices", (data) => {
        console.log("xiaomihome.devices", data)
    })
    
    socket.on('central.init', function() {
        console.log("on", "central.init")
        nsp.emit("xiaomihome.devices")
        
    })
    
    nsp.emit("central.init", ["xiaomihome.device.color"], ["xiaomihome.gateway.read"])
  

    socket.on("xiaomihome.gateway.read", (data, device) => {
        console.log("xiaomihome.gateway.read", data, device)
        if (device.model === "magnet" && device.event === "open") {
            
        }
    })

    socket.on('disconnect', function(){
      console.log('user disconnected');
    })

})
  