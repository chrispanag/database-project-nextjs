let Bookshelf = require('../database');

require('./department');
var Vehicle = Bookshelf.Model.extend({
  tableName: 'VEHICLES',
  idAttribute: 'id',
  department: function() {
    return this.belongsTo('Department', 'department_id');
  }
});

module.exports = Bookshelf.model('Vehicle', Vehicle);
