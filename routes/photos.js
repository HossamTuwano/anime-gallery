const express = require("express");
const photosController = require("../controllers/photos");

const route = express.Router();

route.post("/photos", photosController.postPhoto);

module.exports = route;
