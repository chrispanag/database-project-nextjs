const knex = require('knex');

var db = knex({client: 'mysql', connection: {
  host: "db4free.net",
  port: 3307,
  user: "chrispanag",
  password: "kalpaki123",
  database: "testvaseis"
}});

bookshelf = require('bookshelf')(db);
bookshelf.plugin('registry');

module.exports = bookshelf;
