const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
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
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
