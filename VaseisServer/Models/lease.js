let Bookshelf = require('../database');

var Lease = Bookshelf.Model.extend({
  tableName: 'LEASES'
})

module.exports = Bookshelf.model('Lease', Lease);
