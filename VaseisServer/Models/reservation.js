let Bookshelf = require('../database');

var Reservation = Bookshelf.Model.extend({
  tableName: 'RESERVATIONS',
  employee: function() {
    return this.belongsTo('Employee', 'department_id');
  },
  vehicle: function() {
    return this.belongsTo('Vehicle', 'vehicle_id');
  },
  customer: function() {
    return this.belongsTo('Customer', 'customer_id');
  }
})

module.exports = Bookshelf.model('Reservation', Reservation);
