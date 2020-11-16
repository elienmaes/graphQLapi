const mongoose = require ('mongoose');
const ShoppingCartSchema = require ('./shoppingCart');

/**
 * Modeling the shoppingCart
 */

 const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    isAdmin: Boolean,
    ShoppingCart:[ShoppingCartSchema],
    
 });

 module.exports = UserSchema;