const express = require("express");
const {
  MyServicePOSTAPI,
  MyServiceGETAPI,
  MyServiceUPDATEAPI,
  MyServiceDELETEAPI,
  MyServiceGETBYIDAPI,
} = require("../controllers/my services");

const myservice_router = express.Router();

myservice_router.post("/api/v1/add-myservice", MyServicePOSTAPI);
myservice_router.get("/api/v1/get-myservice", MyServiceGETAPI);
myservice_router.get("/api/v1/get-myservicebyId", MyServiceGETBYIDAPI);
myservice_router.post("/api/v1/update-myservice", MyServiceUPDATEAPI);
myservice_router.delete("/api/v1/delete-myservice", MyServiceDELETEAPI);

module.exports = myservice_router;
