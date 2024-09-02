const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  canteenid: {
    type: mongoose.Schema.ObjectId,
    ref: "Canteen",
    required: [true, "Order must belong to a Canteen!"],
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a User!"],
  },
  items: [
    {
      itemid: {
        type: mongoose.Schema.ObjectId,
        ref: "CanteenItem",
        required: [true, "An item in the order must be specified."],
      },
      price: {
        type: Number,
        ref: "CanteenItem",
        required: [true, "An item price in the order must be specified."],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity of the item must be specified."],
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, "Order must have a total amount."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  CollectingTime: {
    type: Date,
    default: Date.now(),
  },
  ready: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  collected: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
