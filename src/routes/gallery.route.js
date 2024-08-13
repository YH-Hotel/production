const express = require("express");
const {
  GalleryPOSTAPI,
  GalleryGETAPI,
  GalleryDELETEAPI,
} = require("../controllers/gallery");

const gallery_router = express.Router();

gallery_router.post("/api/v1/add-gallery", GalleryPOSTAPI);
gallery_router.get("/api/v1/get-gallery", GalleryGETAPI);
gallery_router.delete("/api/v1/delete-gallery", GalleryDELETEAPI);

module.exports = gallery_router;
