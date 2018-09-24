module.exports = function (io, models) {

    var nxs = io.of('/xiaomisecurity');
    var nc = io.of('/camera');

    var timeouts = [];

    function clearTimeouts() {
        for (let i = timeouts.length; i < 0; i--) {
            var timeout = timeouts.shift()
            clearTimeout(timeout);
            
        }
    }
    
    function setColor(gateways, color, off) {

        for (let i = 0; i < gateways.length; i++) {

            nxs.emit("xiaomihome.device.color", gateways[i], null, color)
            if (off) {
                timeouts.push(setTimeout(() => {
                    nxs.emit("xiaomihome.device.color", gateways[i], null, colors.off)
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
    const gatewaysSid = {}
    gatewaysSid.prototype.keys = function() {
        return Object.keys(this)
    }
    var doorsClosed = true
    console.log("socket")

    nxs.on("central.init", function (value) {
        console.log("nxs", "central.init", value)
    })

    nxs.on('connection', function (socket) {
        console.log('a user connected');

        socket.on("xiaomihome.devices", (gateways) => {

            for (let i = 0; i < gateways.length; i++) {
                gatewaysSid[gateways[i].sid] = {
                    status: 'ready',
                    timeout: null
                }
            }
            console.log(gatewaysSid.keys())
            setColor(gatewaysSid.keys(), colors.green, true)
        })

        socket.on('central.init', function () {
            console.log("on", "central.init")
            nxs.emit("xiaomihome.devices")

        })

        nxs.emit("central.init", ["xiaomihome.devices", "xiaomihome.device.color"], ["xiaomihome.gateway.read", "xiaomihome.devices", "nfc.data"])

        socket.on("xiaomihome.gateway.read", (gtsid, device) => {
            console.log(gtsid, device)
            if (device.model === "magnet" && device.event === "open") {
                setColor([gtsid], colors.orange)
                setTimeout(() => {
                    setColor([gtsid], colors.red)
                }, 10000)
            }
        })
 
        socket.on("nfc.data", (data) => {
            console.log(data)
            models.User.find({where: {card_sid: data}}).then((user) => {
                console.log(user)
                if (user) {
                    setColor(gatewaysSid.keys(), colors.green)
                }
                
            })
        })

        socket.on('disconnect', function () {
            console.log('user disconnected');
        })

    })

    return nc
}