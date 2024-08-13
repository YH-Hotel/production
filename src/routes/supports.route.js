const express = require("express");
const {
  SupportsPOSTAPI,
  SupportsGETAPI,
  SupportsUPDATEAPI,
  SupportsDELETEAPI,
} = require("../controllers/support");

const support_router = express.Router();

support_router.post("/api/v1/add-support", SupportsPOSTAPI);
support_router.get("/api/v1/get-support", SupportsGETAPI);
support_router.post("/api/v1/update-support", SupportsUPDATEAPI);
support_router.delete("/api/v1/delete-support", SupportsDELETEAPI);

module.exports = support_router;
