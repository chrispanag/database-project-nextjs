let Bookshelf = require('../database');

var Reservation = Bookshelf.Model.extend({
  tableName: 'RESERVATIONS'
})

module.exports = Bookshelf.model('Reservation', Reservation);
