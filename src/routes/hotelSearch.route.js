const express = require("express");
const { GETHotelSearchAPI } = require("../controllers/hotel serach");

const hotelsearch_router = express.Router();

hotelsearch_router.get("/api/v1/get-hotel-search", GETHotelSearchAPI);

module.exports = hotelsearch_router;
