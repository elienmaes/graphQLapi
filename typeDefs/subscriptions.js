/**
 * The GraphQL subscription
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Subscription {
    itemAdded: Item
  }
`