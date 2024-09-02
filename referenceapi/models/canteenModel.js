const mongoose = require("mongoose");
const canteenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A canteen must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      50,
      "Canteen name must have less than or equal to 50 characters",
    ],
    minlength: [5, "Canteen name must have at least 5 characters"],
  },
  ownerName: {
    type: Object,
    required: [false, "A canteen must have an owner name"],
  },
  items: Array,
  openingHours: {
    type: String,
    required: [true, "Operating hours are required"],
  },
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
      items: [
        {
          itemName: String,
          description: String,
          price: Number,
          image: String,
        },
      ],
    },
  ],
  reviews: [
    {
      user: String, // You can associate reviews with user IDs or usernames
      rating: {
        type: Number,
        required: true,
      },
      comment: String,
    },
  ],
  contact: {
    phone: String,
    email: String,
    website: String,
  },
  featuredItems: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "CanteenItem",
      },
    },
  ],
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  imagesrc: {
    type: String,
    required: [true, "A canteen must have pic"],
    default:
      "https://lh3.googleusercontent.com/ImXohSEcrPhQTmwkEdaVq4yBziICscPjojOen2MrSP6LgQXznQWr6IKF2haC8AoB0YbgjiMQDso3m5pQc-aCZwxMX9A=w1200-rw",
  },
});

const Canteen = mongoose.model("Canteen", canteenSchema);

module.exports = Canteen;
