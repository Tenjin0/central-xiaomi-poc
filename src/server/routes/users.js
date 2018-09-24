const express = require('express')
const router = express.Router()

const user = require("../controllers/user")

router.get("/", user.list)

router.post("/user", user.add)

router.delete("/user", user.delete)

router.put("/user/:id", user.edit)
module.exports = router;