const express = require("express");
const testController = require("../controllers/test");

const route = express.Router();

route.get("/test", testController.getTest);

module.exports = route;
