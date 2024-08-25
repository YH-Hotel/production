const express = require("express");
const GetAitports = require("../controllers/airport-api/get-all-airports");
const GetFlight = require("../controllers/airport-api/flightapi");

const airports_router = express.Router();

airports_router.get("/api/v1/get-all-airports", GetAitports);

airports_router.get("/api/v1/get-flight-cleartrip", GetFlight);


module.exports = airports_router;