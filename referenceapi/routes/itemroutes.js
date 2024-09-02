const express = require("express");
const canteenItemController = require("../controllers/canteenItemController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(canteenItemController.getAllItems)
  .post(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenItemController.createItem
  );

router
  .route("/:id")
  .get(canteenItemController.getItemById)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenItemController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenItemController.deleteItem
  );

router
  .route("/canteen/:canteenId")
  .patch(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenItemController.updateCanteeen
  )
  .get(canteenItemController.getAllItemsByCanteenId);

router
  .route("/canteen/:canteenId/:id")
  .get(canteenItemController.getItemByIdfromcanteen)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenItemController.deleteItemfromcanteen
  );

module.exports = router;
