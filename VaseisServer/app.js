var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');


const knex = require('knex');

const db = knex({client: 'mysql', connection: {
  host: "db4free.net",
  port: 3307,
  user: "chrispanag",
  password: "kalpaki123",
  database: "testvaseis"
}});

const resolvers = require('./resolvers.js')(db);

const typeDefs = require('./schema.js');

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
