/**
 * This is the pubsub singleton needed for subscriptions and publishing
 */

const { PubSub } = require("graphql-subscriptions");
module.exports = new PubSub();