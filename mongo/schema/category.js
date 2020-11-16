const mongoose = require ('mongoose');
const ItemSchema = require ('./item');

const CategorySchema = new mongoose.Schema({
  name: String,
  
});

module.exports = CategorySchema;