// ...existing code...
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const { register, login, current } = userController.default || userController; // changed

const home = (req, res) => {
  res.send("Hello, world!");
};
// ...existing code...
router.route("/").get(home);
router.route("/journal").get((req, res) => {
  res.send("Get all journals");
});
router.route("/journal/:id").get((req, res) => {
  res.send(`Get journal with id ${req.params.id}`);
});
// ...existing code...
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(current);
module.exports = router;