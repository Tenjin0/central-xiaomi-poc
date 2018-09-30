module.exports = function (io, models) {

    var nxs = io.of('/xiaomisecurity');
    var nc = io.of('/camera');

    var colors = {
        off: {
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

    function changeColor(socket, color) {
        return new Promise((resolve, reject) => {
            socket.once("xiaomihome.device.color", (data) => {
                socket.status = color
                resolve(data)
            })
            socket.once("xiaomihome.device.color.error", (err) => {
                reject(err)
            })
            socket.emit("xiaomihome.device.color", "all", null, colors[color])
        })
    }

    function cameraDetection(socket) {


        socket.emit("camera.device.start", {
            deviceid: 0,
            fps: 1,
            height: 200,
            width: 200
        })

        setTimeout(async () => {
            socket.emit("camera.device.stop", 0)
            await changeColor(socket, "green")
        }, 10000)
    }

    nxs.on('connection', async function (socket) {

        socket.doors = {}
        socket.timeout = null;

        socket.on('central.init', function () {

            socket.emit("xiaomihome.devices")
        })

        socket.on("xiaomihome.devices", async function (devices) {

            for (let i = 0; i < devices.length; i++) {

                for (let j = 0; j < devices[i].sensors.length; j++) {
                    const sensor = devices[i].sensors[j];
                    if (sensor.model === "magnet") {
                        socket.doors[sensor.sid] = sensor.state
                    }
                }

            }
            await changeColor(socket, "green")
        })

        socket.emit("central.init", ["camera.device.start", "camera.device.stop", "camera.device.data", "xiaomihome.devices", "xiaomihome.device.color", "xiaomihome.device.sound"], ["camera.start", "camera.stop", "xiaomihome.gateway.read", "xiaomihome.devices", "xiaomihome.device.color", "xiaomihome.device.color.error", "nfc.data"])

        socket.on("xiaomihome.gateway.read", async (gtsid, device) => {

            if (device.model === "magnet") {
                socket.doors[device.sid] = device.event
            }
            if ( socket.status === "green" && device.model === "magnet" && device.event === "open") {
                socket.doors[device.sid] = device.event
                await changeColor(socket, "orange")
                if (socket.timeout) {
                    clearTimeout(socket.timeout)
                }
                socket.timeout = setTimeout(async () => {
                    await changeColor(socket, "red")
                    cameraDetection(socket)
                }, 3000)
            }
        })

        socket.on("nfc.data", (data) => {
            models.User.find({
                where: {
                    card_content: data
                }
            }).then(async (user) => {
                if (user) {
                    if (user.card_content === data) {
                        await changeColor(socket, "green")
                        socket.emit("xiaomihome.device.sound", "all", null, {
                            track: 100010,
                            volume: 1
                        })
                        clearTimeout(socket.timeout)
                        socket.status = "ready"

                    } else {
                        socket.emit("xiaomihome.device.sound", "all", null, {
                            track: 100011,
                            volume: 1
                        })
                    }

                }

            })
        })

        socket.on("camera.device.data", (data) => {
            
        })
        socket.on('disconnect', function () {
            console.log('user disconnected');
        })

    })

    return nc
}