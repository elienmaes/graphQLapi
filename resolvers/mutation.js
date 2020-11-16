/**
 * The Mutation Resolvers
 */
const bcrypt = require ('bcrypt');
const pubsub = require('./pubsub');
const { ApolloError, AuthenticationError, PubSub} = require ('apollo-server');

const { User, Item, ShoppingCart, Category } = require("../mongo/models");

module.exports = {
  Mutation: {
    addNewItem: async(parent,{item},context)=>{
      try{ 
        if(context.userId === '') throw new AuthenticationError('Must authenticate!');
        const {name} = item;
        //check if item already exists
        const itemExists = await Item.exists({name});
        if(itemExists) throw new ApolloError ('This item already exists');

        //add item to database if it doesn't already exists
        const newItemAddedToList= await Item.create({
          ...item,
          created_on: new Date(),
          category: []
        });
        
        pubsub.publish('ITEM_ADDED', {itemAdded: newItemAddedToList});
        return newItemAddedToList;
               
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },
    removeItem: async(parent,{item},context)=>{
        try{
          if(context.userId === '') throw new AuthenticationError('Must authenticate!');
          // validate if shoppingCart exists
        const itemExists = await Item.exists({_id: item});
        if(!itemExists) throw new ApolloError("No item was found");
        //remove item 
        const removeItem=Item.findOneAndDelete({_id: item});
       
        return removeItem;
        
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },
    updateItem: async(parent,{item,itemupdate},context)=>{
        try{
          if(context.userId === '') throw new AuthenticationError('Must authenticate!');
         // validate if shoppingCart exists
        const itemExists = await Item.exists({_id: item});
        if(!itemExists) throw new ApolloError("No item was found");
        
        //update item from Itemlist
        const updateItem= await Item.findOneAndUpdate(
          {_id: item},
          itemupdate,
          {new:true}
        );
     
        return updateItem;
        
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },
    addItemToShoppingCart: async (parent, {item,shoppingCartId},context)=>{
      try{
        if(context.userId === '') throw new AuthenticationError('Must authenticate!');
        // validate if shoppingCart exists
        const shoppingCartExists = await ShoppingCart.exists({_id: shoppingCartId});
        if(!shoppingCartExists) throw new ApolloError("No shoppingCart was found");

        //get the shoppingCart
        const shoppingCart = await ShoppingCart.findOne({_id: shoppingCartId});

        //add item to shoppingCart
        ShoppingCart.items.push(item);
        
        //save the item to the shoppingCart
        return await shoppingCart.save();
        
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    addShoppingCartToUser: async (parent, {shoppingCart,userId}, context)=>{
      try{
        if(context.userId === '') throw new AuthenticationError('Must authenticate!');
        // validate if user exists
        const userExists = await User.exists({_id: userId});
        if(!userExists) throw new ApolloError("No user was found");

        //get the user
        const user = await User.findOne({_id: userId});

        //add shoppingCart to user
        User.shoppingCart.push(shoppingCart);
        
        //save the shoppingCart
        return await user.save();
        
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    addCategoryToItem:  async (parent, {category,itemId}, context)=>{
      try{
        if(context.userId === '') throw new AuthenticationError('Must authenticate!');
        // validate if category exists
        const itemExists = await Item.exists({_id: itemId});
        if(!itemExists) throw new ApolloError("No item was found");

        //get the item
        const item = await Item.findOne({_id: itemId});

        //add category to item
        item.category.push(category);
        
        //save the category to the item
        return await item.save();
        
      } catch(e){
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },
    
    

    register: async (parent, {user}) => {
      const {email, password,isAdmin} = user;

      //validate if user exists
      const userExists= await User.exists({email});
      if (userExists) throw new Error ('User already exists');

      //create hashed password
      const hashedPassword = bcrypt.hashSync(password, 12);
    
      //create new user
       const newUser = await User.create({
        email,
        password: hashedPassword,
        isAdmin:false,
      });

      //reset the password for security issues
      newUser.password = null;

      //return the user
      return newUser;
    }
  }
}