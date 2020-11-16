/**
 * The GraphQL mutations
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addNewItem(item: ItemInput):Item
    removeItem(item: ID):Item
    updateItem(item:ID, itemupdate:ItemInput): Item
    addItemToShoppingCart(item:ItemInput, shoppingCartId:ID): ShoppingCart
    addShoppingCartToUser(shoppingCart:ShoppingCartInput, UserId:ID): ShoppingCart
    addCategoryToItem(category: CategoryInput, itemId:ID): Item 
    register (user: UserInput): User
    
  }
`