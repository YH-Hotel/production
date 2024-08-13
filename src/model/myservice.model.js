const mongoose = require("mongoose");

const myServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    sub_img1: {
      type: String,
      trim: true,
    },
    sub_img2: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    provide_desc: {
      type: String,
      required: true,
      trim: true,
    },
    service_desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const MyService = mongoose.model("MyService", myServiceSchema);

module.exports = MyService;
