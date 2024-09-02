const express = require("express");
const canteenController = require("../controllers/canteenController");
const authController = require("../controllers/authController");
// const reviewRouter = require("../routes/canteenReviewRoutes");

const router = express.Router();

// Middleware to use with all canteen routes, e.g., authentication

// Example route to get the top 5 canteens
// router
//   .route("/top-5-cheap")
//   .get(canteenController.aliasTopCanteens, canteenController.getAllCanteens);

// Example route to get canteen statistics
// router.route("/canteen-stats").get(canteenController.getCanteenStats);

// Example route to get monthly plan for canteens
// router
//   .route("/monthly-plan/:year")
//   .get(
//     authController.protect,
//     authController.restrictTo("admin", "canteen", "guide"),
//     canteenController.getMonthlyPlan
//   );

// Example route to get canteens within a specified distance
// router
//   .route("/canteens-within/:distance/center/:latlng/unit/:unit")
//   .get(canteenController.getCanteensWithin);
// /canteens-within?distance=233&center=-40,45&unit=mi
// /canteens-within/233/center/-40,45/unit/mi

// Route for creating a new canteen (protected for admin/canteen)
router
  .route("/")
  .get(canteenController.getAllCanteens)
  .post(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenController.createCanteen
  );

// Routes for getting, updating, and deleting a specific canteen
router
  .route("/:id")
  .get(canteenController.getCanteen)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenController.updateCanteen
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "canteen"),
    canteenController.deleteCanteen
  );

// Routes for canteen reviews (assuming a separate route for reviews)
// router.use("/:canteenId/reviews", rev  iewRouter);

module.exports = router;
