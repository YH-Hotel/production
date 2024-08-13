const express = require("express");
const {
  RecentSearchPOSTAPI,
  RecentSearchGETAPI,
} = require("../controllers/recent search");
const {
  TopDestinationPOSTAPI,
  TopDestinationGETAPI,
  TopDestinationDELETEAPI,
  TopDestinationUPDATEAPI,
} = require("../controllers/holiday packages/getHoliday-homepage");
const {
  DescriptionPOSTAPI,
  DescriptionGETAPI,
  DescriptionUpdateAPI,
} = require("../controllers/description");
const verifyToken = require("../middleware/auth.middleware");

const recent_router = express.Router();

recent_router.post("/api/v1/add-recent-search", RecentSearchPOSTAPI);
recent_router.get("/api/v1/get-recent-search", RecentSearchGETAPI);

// TopDestination API are here
recent_router.post("/api/v1/add-top-destination", TopDestinationPOSTAPI);
recent_router.get("/api/v1/get-top-destination", TopDestinationGETAPI);
recent_router.delete("/api/v1/delete-top-destination", TopDestinationDELETEAPI);
recent_router.post("/api/v1/update-top-destination", TopDestinationUPDATEAPI);

// Description API are here
recent_router.post("/api/v1/add-description", DescriptionPOSTAPI);
recent_router.post("/api/v1/update-description", DescriptionUpdateAPI);
recent_router.get("/api/v1/get-description", DescriptionGETAPI);

module.exports = recent_router;
