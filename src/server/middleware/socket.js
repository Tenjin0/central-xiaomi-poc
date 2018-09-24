module.exports = function (io, models) {

    var nxs = io.of('/xiaomisecurity');
    var nc = io.of('/camera');

    function setColors(socket, color, off) {

        socket.emit("xiaomihome.device.color", "all", null, color)
            if (off) {
                timeouts.push(setTimeout(() => {
                    socket.emit("xiaomihome.device.color", "all", null, colors.off)
                }, 3000))
            }
        }
    }

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
        var wpt = {
            status = "offline",
            timeout = null
        }
        console.log('a user connected');

        socket.on("xiaomihome.devices", (gateways) => {

            wpt.status = "ready"
            for (let i = 0; i < gateways.length; i++) {
                wpt.gateways.push([gateways[i].sid])
            }
            setColor(socket, colors.green, true)
        })

        socket.on('central.init', function () {
            console.log("on", "central.init")
            socket.emit("xiaomihome.devices")

        })

        socket.emit("central.init", ["xiaomihome.devices", "xiaomihome.device.color"], ["xiaomihome.gateway.read", "xiaomihome.devices", "nfc.data"])

        socket.on("xiaomihome.gateway.read", (gtsid, device) => {
            console.log(gtsid, device)
            if (device.model === "magnet" && device.event === "open") {
                setColor(socket, colors.orange)
                setTimeout(() => {
                    setColor(socket, colors.red)
                }, 10000)
            }
        })
 
        socket.on("nfc.data", (data) => {
            models.User.find({where: {card_sid: data}}).then((user) => {
                console.log(user)
                if (user) {
                    setColor(socket, colors.green)
                    if (wpt.timeout) {
                        clearTimeout(wpt.timeout)
                        wpt.timeout = null
                    }
                }
                
            })
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        })

    })

    return nc
}