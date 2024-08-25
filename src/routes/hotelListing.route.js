const express = require("express");
const {
  HotelListingPOSTAPI,
  HotelListingGETAPI,
  HotelListingDELETEAPI,
  HotelDescriptionGETAPI,
  HotelListingUpdateAPI,
  HotelListingGETAllAPI,
  HotelListingDescGETAllAPI,
  HotelData,
  HotelByID,
} = require("../controllers/hotel listing");

const hotelListing_router = express.Router();

hotelListing_router.post("/api/v1/add-hotelListing", HotelListingPOSTAPI);
hotelListing_router.post("/api/v1/update-hotelListing", HotelListingUpdateAPI);
hotelListing_router.get("/api/v1/get-hotelListing", HotelListingGETAPI);
hotelListing_router.get("/api/v1/get-all-hotelListing", HotelListingGETAllAPI);
hotelListing_router.get("/api/v1/get-description-hotelListing", HotelListingDescGETAllAPI);
hotelListing_router.get(
  "/api/v1/get-description-hotel",
  HotelDescriptionGETAPI
);
hotelListing_router.delete(
  "/api/v1/delete-hotelListing",
  HotelListingDELETEAPI
);

hotelListing_router.get("/api/v1/hotelData-api-cleartrip", HotelData);
hotelListing_router.get("/api/v1/hotelData-api-cleartrip-id", HotelByID);

module.exports = hotelListing_router;
