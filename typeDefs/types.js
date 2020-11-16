/**
 * The GraphQL types
 */

const {
  gql
} = require('apollo-server');

module.exports = gql `
  scalar Date

  enum Flavor {
    BLOEMIG,
    CHOCOLADE,
    FRUITIG,
    KRUIDIG,
    NOTIG,

  }
  
  type ShoppingCart{
    id:ID!
    items:[Item]
    isPaid: Boolean
    user:User
  }

  type Item {
    id: ID!
    brand: String
    flavor: Flavor
    country: String
    name: String
    intensity: Int
    price: Float
    description: String
    imageurl:String
    quantity: Float
    category: [Category]
    created_on: Date
   
  }

  type User{
    id:ID
    email: String
    password: String
    shoppingCart:[ShoppingCart]
    isAdmin: Boolean
  }

  type AuthData{
    userId: ID
    token: String
    isAdmin: Boolean
  }

  type Category{
    id:ID
    name: String
    items:[Item]
  }
`