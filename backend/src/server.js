// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start Apollo Server after successfully connecting to MongoDB
    startApolloServer();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create Apollo Server function
async function startApolloServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({ typeDefs, resolvers });

  // Initialize Express app
  const app = express();

  // Apply middleware after starting the server
  await server.start();
  server.applyMiddleware({ app });

  // Define port
  const PORT = process.env.PORT || 4000;

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}
