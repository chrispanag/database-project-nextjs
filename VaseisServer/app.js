var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

var corsOptions = {
  origin: '*',
  exposedHeaders: ['X-Total-Count', 'Content-Type'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const resolvers = require('./resolvers.js')();

const typeDefs = require('./schema.js');

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use(cors(corsOptions));
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
