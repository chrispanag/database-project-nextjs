let Bookshelf = require('../database');

require('./department');
require('./reservation');
var Vehicle = Bookshelf.Model.extend({
  tableName: 'VEHICLES',
  idAttribute: 'id',
  department: function() {
    return this.belongsTo('Department', 'department_id');
  },
  reservation: function() {
    return this.hasMany('Reservation', 'vehicle_id')
  }
});

module.exports = Bookshelf.model('Vehicle', Vehicle);
