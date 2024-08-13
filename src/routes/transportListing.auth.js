const express = require("express");
const {
  TransportListingPOSTAPI,
  TransportListingGETAPI,
  TransportListingDELETEAPI,
  TransportListingUpdateAPI,
  TransportListingGETAllAPI,
} = require("../controllers/transport listing");

const transportlist_router = express.Router();

transportlist_router.post(
  "/api/v1/add-transportListing",
  TransportListingPOSTAPI
);
transportlist_router.get(
  "/api/v1/get-transportListing",
  TransportListingGETAPI
);
transportlist_router.get(
  "/api/v1/get-all-transportListing",
  TransportListingGETAllAPI
);
transportlist_router.post(
  "/api/v1/update-transportListing",
  TransportListingUpdateAPI
);
transportlist_router.delete(
  "/api/v1/delete-transportListing",
  TransportListingDELETEAPI
);

module.exports = transportlist_router;
