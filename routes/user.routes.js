const express = require("express");
const router = express.Router()
const {addStudent, login} = require("../controllers/user.controller")

// router.get("/welcome",displayWelcome)

router.post("/addStudent", addStudent)
router.post("/login",login)

module.exports = router