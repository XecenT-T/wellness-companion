// ...existing code...
const express = require("express");
const router = express.Router();


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

router.route("/register").get((req, res)=>{
  res.send("Register user");
});
router.route("/login").get((req, res)=>{
  res.send("Login user");
});
// router.route("/current").get(current); to be protected later
module.exports = router;