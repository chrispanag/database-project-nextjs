let Bookshelf = require('../database');

require('./department');
var Employee = Bookshelf.Model.extend({
  tableName: 'EMPLOYEES',
  department: function() {
    return this.belongsTo('Department', 'department_id');
  }
})

module.exports = Bookshelf.model('Employee', Employee);
