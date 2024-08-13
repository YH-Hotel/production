const express = require("express");
const {
  HotelWithDealPOSTAPI,
  HotelWithDealGETAPI,
  HotelWithDealUPDATEAPI,
  HotelWithDealDELETEAPI,
  HotelWithDealGETByIDAPI,
} = require("../controllers/hotels with deals");

const HotelWithDeal_router = express.Router();

HotelWithDeal_router.post("/api/v1/add-hotelswithdeal", HotelWithDealPOSTAPI);
HotelWithDeal_router.get("/api/v1/get-hotelswithdeal", HotelWithDealGETAPI);
HotelWithDeal_router.get("/api/v1/get-hotelswithdealbyid", HotelWithDealGETByIDAPI);
HotelWithDeal_router.post(
  "/api/v1/update-hotelswithdeal",
  HotelWithDealUPDATEAPI
);
HotelWithDeal_router.delete(
  "/api/v1/delete-hotelswithdeal",
  HotelWithDealDELETEAPI
);

module.exports = HotelWithDeal_router;
