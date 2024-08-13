const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
      trim: true,
      default: "<h1>Description</h1>",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "HomePage_Description",
    },
  },
  { timestamps: true }
);

const Description = mongoose.model("Description", DescriptionSchema);

module.exports = Description;
