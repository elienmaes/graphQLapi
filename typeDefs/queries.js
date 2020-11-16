/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    shoppingCarts:[ShoppingCart]
    shoppingCart(id:ID):ShoppingCart
    items: [Item]
    item(id:ID): Item
    users: [User]
    user(id:ID): User
    categories: [Category]
    category(id:ID): Category
    login(user: UserInput): AuthData
  }
`