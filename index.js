require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const isAuth = require('./middlewares/isAuth')

const PORT = process.env.PORT || 4004
const URI = process.env.MONGO_URI

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: ({ req }) => req
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

// use isAuth middleware
app.use(isAuth)

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Anything that doesn't match the above, send back index.html
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.applyMiddleware({ app, path: '/graphql' })

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => app.listen({ port: PORT }))
  .then(() => console.log(`app listening on port ${PORT} --- graphql server on /graphql`))
  .catch(err => console.log(err))


