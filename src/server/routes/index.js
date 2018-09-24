const users = require("./users")

module.exports = (app) => {

    app.get("/", (req, res) => {
    
        res.send("Hello World central")
    })
    
    app.use('/api/users', users);
}

