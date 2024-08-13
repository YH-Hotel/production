const express = require("express");
const {
  TestimonialPOSTAPI,
  TestimonialGETAPI,
  TestimonialUPDATEAPI,
  TestimonialDELETEAPI,
} = require("../controllers/testimonial");

const testimonial_router = express.Router();

testimonial_router.post("/api/v1/add-testimonial", TestimonialPOSTAPI);
testimonial_router.get("/api/v1/get-testimonial", TestimonialGETAPI);
testimonial_router.post("/api/v1/update-testimonial", TestimonialUPDATEAPI);
testimonial_router.delete("/api/v1/delete-testimonial", TestimonialDELETEAPI);

module.exports = testimonial_router;
