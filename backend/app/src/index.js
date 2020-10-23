const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const resolvers = require('@merng/resolvers')
const typeDefs = require('./typeDefs')
const { MONGODB } = require('../config')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected!')
    return server.listen({ port: 4001 })
  })
  .then(({ url }) => {
    console.log(`Server running at ${url}`)
  })
  .catch((err) => console.log(err))
