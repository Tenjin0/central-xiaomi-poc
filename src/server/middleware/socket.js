module.exports = function (io, models) {

    var nxs = io.of('/xiaomisecurity');
    var nc = io.of('/camera');

    var colors = {
        off : {
            r: 0,
            g: 0,
            b: 0,
            i: 0
        },
        orange: {
            r: 255,
            g: 70,
            b: 0,
            i: 100
        },
        red: {
            r: 255,
            g: 0,
            b: 0,
            i: 100
        },
        green: {
            r: 0,
            g: 255,
            b: 0,
            i: 100
        }
    }

    nxs.on("central.init", function (value) {
        console.log("nxs", "central.init", value)
    })

    nxs.on('connection', function (socket) {
        // var wpt = {
        //     status: "offline",
        //     timeout: null,
        //     gateways: []
        // }
        console.log('a user connected');

        socket.on('central.init', function () {
            socket.emit("xiaomihome.device.color", "all", null, colors.green)
        })

        socket.emit("central.init", ["xiaomihome.devices", "xiaomihome.device.color"], ["xiaomihome.gateway.read", "xiaomihome.devices", "nfc.data"])

        socket.on("xiaomihome.gateway.read", (gtsid, device) => {
            console.log(gtsid, device)
            if (device.model === "magnet" && device.event === "open") {
                socket.emit("xiaomihome.device.color", "all", null, colors.orange)
                setTimeout(() => {
                    socket.emit("xiaomihome.device.color", "all", null, colors.red)
                }, 10000)
            }
        })
 
        socket.on("nfc.data", (data) => {
            models.User.find({where: {card_sid: data}}).then((user) => {
                console.log(user)
                if (user) {
                    socket.emit("xiaomihome.device.color", "all", null, colors.green)

                    // if (wpt.timeout) {
                    //     clearTimeout(wpt.timeout)
                    //     wpt.timeout = null
                    // }
                }
                
            })
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        })

    })

    return nc
}