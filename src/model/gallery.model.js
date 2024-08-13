const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: [],
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
