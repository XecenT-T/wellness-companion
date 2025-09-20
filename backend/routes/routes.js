const express = require("express");
const router = express.Router();
const { register, login, current } = require("../controllers/usercontroller");

const home = (req, res) => {
  res.send("Hello, world!");
};

router.route("/").get(home);
router.route("/journal").get((req, res) => {
  res.send("Get all journals");
});
router.route("/journal/:id").get((req, res) => {
  res.send(`Get journal with id ${req.params.id}`);
});

router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/current").get(current); to be protected later
module.exports = router;