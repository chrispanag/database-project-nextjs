let Bookshelf = require('../database');

var Customer = Bookshelf.Model.extend({
  tableName: 'CUSTOMERS'
});

module.exports = Bookshelf.model('Customer', Customer);
