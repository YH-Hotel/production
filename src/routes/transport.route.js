const express = require("express");
const {
  TransportServicePOSTAPI,
  TransportServiceGETAPI,
  TransportServiceUPDATEAPI,
  TransportServiceDELETEAPI,
} = require("../controllers/transport service");

const transportService_router = express.Router();

transportService_router.post(
  "/api/v1/add-transportService",
  TransportServicePOSTAPI
);
transportService_router.get(
  "/api/v1/get-transportService",
  TransportServiceGETAPI
);
transportService_router.post(
  "/api/v1/update-transportService",
  TransportServiceUPDATEAPI
);
transportService_router.delete(
  "/api/v1/delete-transportService",
  TransportServiceDELETEAPI
);

module.exports = transportService_router;
