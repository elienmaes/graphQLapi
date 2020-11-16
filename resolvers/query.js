/**
 * The Query Resolvers
 */
const { Category, Item, ShoppingCart, User } = require('../mongo/models.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    shoppingCarts: () =>  ShoppingCart.find(),
    shoppingCart: (parent, {id}) => ShoppingCart.findOne({_id:id}),
    items: () => Item.find(),
    item: (parent,{id})=> Item.findOne({_id:id}),
    users: ()=> User.find(),
    user: ()=> User.findOne({_id:id}),
    categories: () => Category.find(),    
    category: (parent, {id}) => Category.findOne({_id:id}),
    login: async(parent, {user}, context) => {
      const {email, password, isAdmin} = user;
      //user exists?
      const userExists = await User.exists({email});
      if(!userExists) throw new Error ('User does not exist');

      //get the user
      const getUser = await User.findOne({email: email});
      console.log(getUser);
      //check if incoming password is equal to userpassword
      const isEqual = bcrypt.compareSync(password, getUser.password);
      if(!isEqual) throw new Error ('Password is incorrect');
      

      //create webtoken
      const token = jwt.sign(
        {userId: getUser._id, email: getUser.email},
        process.env.TOKEN_SALT,
        {expiresIn:'1h'}
      );

      //return the auth data
      return{
        userId: getUser.id,
        token,
        isAdmin: getUser.isAdmin
      }
    },
    
    users: (parent, parms, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.find();
    },
    user: (parent, {id}, context) => {
      console.log(context);
      if(context.userId === '') throw new AuthenticationError(' Must authenticate!')
       else return User.findOne({_id:id});
    },

  },
}