const express = require("express");
const {
  PartnersPOSTAPI,
  PartnersGETAPI,
  PartnersDELETEAPI,
} = require("../controllers/partners");

const partners_router = express.Router();

partners_router.post("/api/v1/add-partners", PartnersPOSTAPI);
partners_router.get("/api/v1/get-partners", PartnersGETAPI);
partners_router.delete("/api/v1/delete-partners", PartnersDELETEAPI);

module.exports = partners_router;
