const express = require("express");
const { MyTripPOSTAPI, MyTripGETAPI } = require("../controllers/my trip");

const myTrip_router = express.Router();

myTrip_router.post("/api/v1/add-mytrip", MyTripPOSTAPI);
myTrip_router.get("/api/v1/get-mytrip", MyTripGETAPI);

module.exports = myTrip_router;
