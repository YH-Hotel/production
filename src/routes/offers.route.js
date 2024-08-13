const express = require("express");
const {
  OffersPOSTAPI,
  OffersGETAPI,
  OffersUPDATEAPI,
  OffersDELETEAPI,
} = require("../controllers/offer page");
const { VerifyPOSTAPI } = require("../controllers/coupen verify");

const offers_router = express.Router();

offers_router.post("/api/v1/add-offers", OffersPOSTAPI);
offers_router.get("/api/v1/get-offers", OffersGETAPI);
offers_router.post("/api/v1/update-offers", OffersUPDATEAPI);
offers_router.delete("/api/v1/delete-offers", OffersDELETEAPI);

offers_router.post("/api/v1/verify-offers", VerifyPOSTAPI);

module.exports = offers_router;
