const mongoose = require("mongoose");

const canteenItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique: true,
    required: [true, "An item must have a name"],
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: [true, "An item must have a price"],
  },
  image: String,
  canteenid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Canteen", 
    required: [true, "An item belong to atleast 1 canteen"],
  },
});

const CanteenItem = mongoose.model("CanteenItem", canteenItemSchema);

module.exports = CanteenItem;
