const express = require("express");
const {
  HotelPackagePOSTAPI,
  HotelPackageGETAPI,
  HotelPackageUPDATEAPI,
  HotelPackageDELETEAPI,
  HotelPackageGETByIdAPI,
} = require("../controllers/hotel packages");

const hotelPackage_router = express.Router();

hotelPackage_router.post("/api/v1/add-hotel-package", HotelPackagePOSTAPI);
hotelPackage_router.get("/api/v1/get-hotel-package", HotelPackageGETAPI);
hotelPackage_router.get(
  "/api/v1/get-hotel-packagebyId",
  HotelPackageGETByIdAPI
);
hotelPackage_router.post("/api/v1/update-hotel-package", HotelPackageUPDATEAPI);
hotelPackage_router.delete(
  "/api/v1/delete-hotel-package",
  HotelPackageDELETEAPI
);

module.exports = hotelPackage_router;
