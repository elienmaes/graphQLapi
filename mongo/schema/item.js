const mongoose = require ('mongoose');
const CategorySchema = require ('./category');


/**
 * Modeling the shoppingCart
 */

 const ItemSchema = new mongoose.Schema({

    brand: String,
    flavor: String,
    country: String,
    name: String,
    intensity: Number,
    price: Number,
    description: String,
    imageurl:String,
    quantity: Number,
    category: [CategorySchema],
    created_on: Date
 });

 module.exports = ItemSchema;