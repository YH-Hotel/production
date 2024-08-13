const express = require("express");
const {
  TrendingGatewayPOSTAPI,
  TrendingGatewayGETAPI,
  TrendingGatewayUPDATEAPI,
  TrendingGatewayDELETEAPI,
} = require("../controllers/trending gateway");

const trending_gateway_router = express.Router();

trending_gateway_router.post(
  "/api/v1/add-trending-gateway",
  TrendingGatewayPOSTAPI
);
trending_gateway_router.get(
  "/api/v1/get-trending-gateway",
  TrendingGatewayGETAPI
);
trending_gateway_router.post(
  "/api/v1/update-trending-gateway",
  TrendingGatewayUPDATEAPI
);
trending_gateway_router.delete(
  "/api/v1/delete-trending-gateway",
  TrendingGatewayDELETEAPI
);

module.exports = trending_gateway_router;
