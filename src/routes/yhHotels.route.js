const express = require("express");
const {
  YHHotelsPOSTAPI,
  YHHotelsGETAPI,
  YHHotelsUPDATEAPI,
  YHHotelsDELETEAPI,
  getbyId,
} = require("../controllers/yh hotels");

const yh_hotels_router = express.Router();

yh_hotels_router.post("/api/v1/add-yhhotels", YHHotelsPOSTAPI);
yh_hotels_router.get("/api/v1/get-yhhotels", YHHotelsGETAPI);
yh_hotels_router.get("/api/v1/get-yhhotels-byid", getbyId);
yh_hotels_router.post("/api/v1/update-yhhotels", YHHotelsUPDATEAPI);
yh_hotels_router.delete("/api/v1/delete-yhhotels", YHHotelsDELETEAPI);

module.exports = yh_hotels_router;
