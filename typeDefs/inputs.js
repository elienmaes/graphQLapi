/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input ItemInput {
    brand: String
    flavor: Flavor
    country: String
    name: String
    intensity: Int
    price: Float
    description: String
    imageurl: String
    quantity: Float
    
  }

  input CategoryInput{
    name: String
  }

  input UserInput {
    email: String
    password: String
    isAdmin:Boolean
  }

  input ShoppingCartInput{
    id:ID!
  }
`