const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const User = require("./../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getbyid = (Model) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    let filter = {};
    if (req.params.userid) filter = { userid: currentUser._id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      orders: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getAllItemsByCanteenId = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.canteenId) filter = { canteenid: req.params.canteenId };
    const items = await Model.find(filter);

    res.status(200).json({
      status: "success",
      results: items.length,
      data: items,
    });
  });

exports.getItemByIdfromcanteen = (Model) =>
  catchAsync(async (req, res, next) => {
    const canteenId = req.params.canteenId;
    const itemId = req.params.itemId;

    const item = await Model.findOne({ canteenid: canteenId, id: itemId });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      status: "success",
      data: item,
    });
  });

exports.deleteItemfromcanteen = (Model) =>
  catchAsync(async (req, res, next) => {
    const canteenId = req.params.canteenId;
    const itemId = req.params.itemId;

    const item = await Model.findOne({ canteenid: canteenId, id: itemId });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await Model.deleteOne({ canteenid: canteenId, id: itemId });

    res.status(204).end();
  });

exports.updateCanteen = (Model, Canteen) =>
  catchAsync(async (req, res, next) => {
    const canteenId = req.params.canteenId;
    let filter;
    if (req.params.canteenId) filter = { canteenid: req.params.canteenId };
    const items = await Model.find(filter);
    const canteen = await Canteen.findById(canteenId);
    if (!canteen) {
      return res.status(404).json({ error: "Canteen not found" });
    }
    canteen.items = items;
    await canteen.save();
    res.status(200).json({
      status: "success",
      data: canteen,
    });
  });

exports.updateUser = (Model, User) =>
  catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    let filter;
    if (req.params.userId) filter = { userid: req.params.userId };
    const orders = await Model.find(filter);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.orders = orders;
    user.password = req.body.password;
    user.passwordConfirm = req.body.password;
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  });
