const express = require("express");
const {
  ShootingRangePOSTAPI,
  ShootingRangeGETAPI,
  ShootingRangeUPDATEAPI,
  ShootingRangeDELETEAPI,
  ShootingRangeGETByIdAPI,
} = require("../controllers/shooting range");

const ShootingRange_router = express.Router();

ShootingRange_router.post("/api/v1/add-shootingrange", ShootingRangePOSTAPI);
ShootingRange_router.get("/api/v1/get-shootingrange", ShootingRangeGETAPI);
ShootingRange_router.get("/api/v1/get-shootingrangeById", ShootingRangeGETByIdAPI);
ShootingRange_router.post(
  "/api/v1/update-shootingrange",
  ShootingRangeUPDATEAPI
);
ShootingRange_router.delete(
  "/api/v1/delete-shootingrange",
  ShootingRangeDELETEAPI
);

module.exports = ShootingRange_router;
