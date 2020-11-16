/**
 * Importing some libraries
 */

const  { ApolloServer } = require('apollo-server');
const dotenv = (require('dotenv')).config();
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/**
 * Connect to mongoose database
 */
const openMongoDB = async () => {
  return new Promise ((resolve, reject) => {
    mongoose.connect(
      process.env.MongoDB_CONNECTIONSTRING,
      {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
      }
    );
    mongoose.connection.on('error', (e)=> reject(e.message));
    mongoose.connection.once('open', ()=> resolve());
  });
}

/**
 * Apollo server
 */
const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
      context: (({ req }) => {
        try{
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
          return decodedToken && decodedToken.userId ? {userId: decodedToken.userId} : {userId: ''};
        } catch{
          return{userId: ''};
        }
      })
    });
 
    server
      .listen({
        port: process.env.PORT || process.env.GRAPHQL_PORT || 4000
      })
      .then(({ url }) => {
        resolve(url)
      });
  });
}

/**
 * Start the server
 */
openMongoDB()
  .then(startServer)
  .then((url)=>console.log(`Server started on ${url}`))
  .catch(e => console.error(e));
