//const { Console } = require("console");
const express = require("express");
//const { read } = require("fs");
const logg = require("../logger/logger");
const help = require("../util/helper");
const val = require("../validator/formatter")
//const { createSecretKey } = require("crypto");

const router = express.Router();

router.get("/test-me", function (req, res) {
  // logger;
  console.log(logg.welcome());
  // util
  console.log(help.printDate());
  console.log(help.printMonth());
  console.log(help.getBatchInfo());
  // validator
  console.log(val.trim());
  console.log(val.changetoLowerCase());
  console.log(val.changeToUpperCase());
  // API Responding
  res.send("My Second API");
});

module.exports = router;
