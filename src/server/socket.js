module.exports = function (io) {

    var colors = {
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
    const gatewaysSid = []

    var doorsClosed = true

    var nxs = io.of('/xiaomisecurity');
    var nc = io.of('/camera');
    nxs.on("central.init", function (value) {
        console.log("nxs", "central.init", value)
    })

    nxs.on('connection', function (socket) {
        console.log('a user connected');

        socket.on("xiaomihome.devices", (gateways) => {

            for (let i = 0; i < gateways.length; i++) {
                gatewaysSid.push(gateways[i].sid)
                nxs.emit("xiaomihome.device.color", gateways[i].sid, null, colors.green)
            }
        })

        socket.on('central.init', function () {
            console.log("on", "central.init")
            nxs.emit("xiaomihome.devices")

        })

        nxs.emit("central.init", ["xiaomihome.devices", "xiaomihome.device.color"], ["xiaomihome.gateway.read", "xiaomihome.devices", "nfc.data"])

        socket.on("xiaomihome.gateway.read", (gtsid, device) => {
            console.log(gtsid, device)
            if (device.model === "magnet" && device.event === "open") {
                nxs.emit("xiaomihome.device.color", "7811dcb8c03c", null, colors.orange)

            }
        })

        socket.on("nfc.data", (data) => {
            nxs.emit("xiaomihome.device.color", "7811dcb8c03c", null, colors.green)
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        })

    })

    return nc
}