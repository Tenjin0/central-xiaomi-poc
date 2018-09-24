const Users = {
    add: function(req, res) {

        req.models.Users.
        res.send("User added")
    },
    list: function(req, res) {
        res.send("Users list")
    },
    edit: function(req, res) {
        res.send("Users list")
    },
    delete: function(req, res) {
        res.send("Users list")
    }
}

module.exports = Users
