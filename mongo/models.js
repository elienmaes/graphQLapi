/**
 * Importing mongoose
 */

const mongoose = require("mongoose");

/**
 * Importing schemas
 */

const CategorySchema = require("./schema/category");
const ItemSchema = require("./schema/item");
const ShoppingCartSchema = require("./schema/shoppingCart");
const UserSchema = require("./schema/user");


/**
 * Creating mongoose models:
 * mongoose.model(modelName, schema)
 */
const Category = mongoose.model("Category", CategorySchema);
const Item = mongoose.model("Item", ItemSchema);
const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);
const User = mongoose.model("User", UserSchema);

/**
 * Exporting the models
 */

module.exports = {
  Category,
  Item, 
  ShoppingCart,
  User
};
