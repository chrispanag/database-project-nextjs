let Bookshelf = require('../database');

require('./vehicle');
require('./employee');
var Department = Bookshelf.Model.extend({
  tableName: 'DEPARTMENTS',
  vehicles: function() {
    return this.hasMany('Vehicle', 'department_id')
  },
  employees: function() {
    return this.hasMany('Employee', 'department_id')
  }
})

module.exports = Bookshelf.model('Department', Department);
