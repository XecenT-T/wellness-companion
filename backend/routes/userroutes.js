const express = require("express");
const router = express.Router();
const { register, login, current } = require("../controllers/usercontroller");

router.post("/register", register);
router.post("/login", login);
router.get("/current", current);

module.exports = router;