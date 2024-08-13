const express = require("express");
const GetAitports = require("../controllers/airport-api/get-all-airports");

const airports_router = express.Router();

airports_router.get("/api/v1/get-all-airports", GetAitports);


module.exports = airports_router;