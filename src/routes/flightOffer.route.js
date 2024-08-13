const express = require("express");
const {
  flighOfferPOSTAPI,
  flighOfferGETAPI,
  flighOfferDELETEAPI,
  flighOfferUPDATEAPI,
} = require("../controllers/flight offer");

const flight_offer_router = express.Router();

flight_offer_router.post("/api/v1/add-flight-offer", flighOfferPOSTAPI);
flight_offer_router.get("/api/v1/get-flight-offer", flighOfferGETAPI);
flight_offer_router.post("/api/v1/update-flight-offer", flighOfferUPDATEAPI);
flight_offer_router.delete("/api/v1/delete-flight-offer", flighOfferDELETEAPI);

module.exports = flight_offer_router;
