const express = require("express");
const {
  BannerPOSTAPI,
  BannerGETAPI,
  BannerUPDATEAPI,
  BannerDELETEAPI,
} = require("../controllers/banners");

const banner_router = express.Router();

banner_router.post("/api/v1/add-banner", BannerPOSTAPI);
banner_router.get("/api/v1/get-banner", BannerGETAPI);
banner_router.post("/api/v1/update-banner", BannerUPDATEAPI);
banner_router.delete("/api/v1/delete-banner", BannerDELETEAPI);

module.exports = banner_router;
