const mongoose = require ('mongoose');
const ItemSchema = require ('./item');
const UserSchema = require ('./user');

/**
 * Modeling the shoppingCart
 */

 const ShoppingCartSchema = new mongoose.Schema({

    items:[ItemSchema],
    isPaid: Boolean,
    user:UserSchema,
 });

 module.exports = ShoppingCartSchema;