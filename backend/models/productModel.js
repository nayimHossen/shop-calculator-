const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, "Please enter product id"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
