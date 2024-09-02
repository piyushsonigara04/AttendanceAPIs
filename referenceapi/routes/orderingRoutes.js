const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
// router.get("/checkout-session/:tourId", orderController.getCheckoutSession);

router
  .route("/")
  .post(orderController.createOrder)
  .get(
    authController.restrictTo("admin", "canteen"),
    orderController.getAllOrders
  );

router.route("/user/:userId").patch(orderController.updateUser);
router.route("/ongoing").get(orderController.getOrderforuser);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(
    authController.restrictTo("admin", "canteen"),
    orderController.updateOrder
  )
  .delete(
    authController.restrictTo("admin", "canteen"),
    orderController.deleteOrder
  );

module.exports = router;
