const CanteenItem = require("../models/itemModal");
const Canteen = require("../models/canteenModel");

const factory = require("./handlerFactory");

exports.getAllItems = factory.getAll(CanteenItem);
exports.getItemById = factory.getOne(CanteenItem);
exports.createItem = factory.createOne(CanteenItem);
exports.updateItem = factory.updateOne(CanteenItem);
exports.deleteItem = factory.deleteOne(CanteenItem);

exports.updateCanteeen = factory.updateCanteen(CanteenItem,Canteen);
exports.getAllItemsByCanteenId = factory.getAllItemsByCanteenId(CanteenItem);
exports.getItemByIdfromcanteen = factory.getItemByIdfromcanteen(CanteenItem);
exports.deleteItemfromcanteen = factory.deleteItemfromcanteen(CanteenItem);
