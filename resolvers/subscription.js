/**
 * The Subscription Resolvers
 */
const pubsub = require('./pubsub');

module.exports = {
  Subscription: {
    itemAdded: { 
      subscribe: () => pubsub.asyncIterator("ITEM_ADDED") }
  }
}