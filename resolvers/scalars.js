/**
 * The Scalars (custom input/output types)
 */

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "This type will represent a date",
    parseValue(value) {
      // value from the client
      // it's coming in (e.g. via a Frontend)
      return new Date(value);
    },
    serialize(value) {
      // value send to the client
      // it's getting out (e.g. via a query)
      // return value;
      return value.getTime();
    },
    // parseLiteral converts the data to AST which basically
    // gives us more information about the data that's being handled; e.g. its type
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value));
      }
      return null;
    }
  })
}