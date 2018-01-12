const moment = require('moment');
const _ = require('lodash');

let Department = require('./Models/department');
let Vehicle = require('./Models/vehicle');
let Employee = require('./Models/employee');
let Lease = require('./Models/lease');
let Customer = require('./Models/customer');
let Reservation = require('./Models/reservation');

module.exports = () => {
  return {
    Query: {
      // Returns all vehicles
      vehicles(root) {
        require('./Models/department');
        return Vehicle.fetchAll({withRelated: ['department']}).then(col => col.serialize());
      },
      vehiclesAvailable(root, {date_start, date_end}) {
        require('./Models/vehicle');
        date_start = moment(date_start).format('YYYY/MM/DD HH:mm:ss');
        date_end = moment(date_end).format('YYYY/MM/DD HH:mm:ss');
        return Reservation.query(qb => {
          qb.whereNotBetween('date_start', [date_start, date_end])
          .whereNotBetween('date_end', [date_start, date_end])
        }).fetch({withRelated: ['vehicle']}).then(reservations => {
          var r_vehicles = _.map(reservations, r => r.vehicle);
          return Vehicle.fetchAll({withRelated: ['reservation']}).then(col => {
            col = col.serialize();
             _.forEach(col, c => {
              if (c.reservation.length == 0) {
                r_vehicles.push(c);
              }
            })
            return r_vehicles;
          })
        });
      },
      vehiclesCabrio(root) {
        require('./Models/department');
        return Vehicle.where('type', "cabrio").fetchAll({withRelated: ['department']}).then(col => col.serialize());
      },
      vehiclesSorted(root) {
        require('./Models/department');
        return Vehicle.fetchAll({withRelated: ['department']}).then(col => _.orderBy(col.serialize(), ['ins_expiration'], ['desc']));
      },
      vehicle(root, {id}) {
        return Vehicle.where('id', id).fetch({withRelated: ['department']}).then(v => v.attributes);
      },
      department(root, {id}) {
        require('./Models/employee');
        require('./Models/vehicle');
        return Department.where('id', id).fetch({withRelated: ['employee', 'vehicle']}).then(d => d.attributes);
      },
      departments(root) {
        require('./Models/employee');
        require('./Models/vehicle');
        return Department.fetchAll({withRelated: ['employees']}).then(col => col.serialize());
      },
      employee(root, {id}) {
        return Employee.where('id', id).fetch().then(e => e.attributes);
      },
      employees(root) {
        return Employee.fetchAll().then(col => col.serialize());
      },
      lease(root, {id}) {
        return Lease.where('id', id).fetch().then(l => l.attributes);
      },
      leases(root) {
        return Lease.fetchAll().then(col => col.serialize());
      },
      reservation(root, {id}) {
        return Reservation.where('id', id).fetch().then(l => l.attributes);
      },
      reservations(root) {
        return Reservation.fetchAll().then(col => col.serialize());
      },
      customer(root, {id}) {
        return Customer.where('id', id).fetch().then(l => l.attributes);
      },
      customers(root) {
        return Customer.fetchAll().then(col => col.serialize());
      }
    },
    Mutation: {
      // VEHICLES
      createVehicle(root, {input}) {
        input.year_bought = moment(input.year_bought).year();
        input.ins_expiration = moment(input.ins_expiration).format('YYYY/MM/DD HH:mm:ss');
        input.service_date = moment(input.service_date).format('YYYY/MM/DD HH:mm:ss');
        var v = new Vehicle(input);
        return v.save().then(() => {
          return Vehicle.query({where: {license_plate: input.license_plate}}).then(rows => rows[0])
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          } else {
            console.log(err);
          }
        });
      },
      deleteVehicle(root, {id}) {
        return (new Vehicle({id})).destroy().then(() => {
          return Vehicle.fetchAll();
        });
      },
      // EMPLOYEES
      createEmployee(root, {input}) {
        var e = new Employee(input);
        return e.save().then(() => {
          return Employee.fetchAll();
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          }
        });
      },
      deleteEmployee(root, {id}) {
        return (new Employee({id})).destroy().then(() => {
          return Employee.fetchAll();
        });
      },
      // DEPARTMENTS
      createDepartment(root, {input}) {
        var d = new Department(input);
        return d.save().then((row) => {
          return Department.fetchAll();;
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          }
        });
      },
      deleteDepartment(root, {id}) {
        return (new Department({id})).destroy().then(() => {
          return Department.fetchAll();
        });
      },
      // CUSTOMERS
      createCustomer(root, {input}) {
        var c = new Customer(input);
        return c.save().then(row => {
          return Customer.fetchAll();;
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          }
        });
      },
      deleteCustomer(root, {id}) {
        var c = new Customer({id})
        return c.destroy().then(() => {
          return Customer.fetchAll();
        });
      },
      // RESERVATIONS
      // CUSTOMERS
      createReservation(root, {input}) {
        input.date_start = moment(input.date_start).format('YYYY/MM/DD HH:mm:ss');
        input.date_end = moment(input.date_end).format('YYYY/MM/DD HH:mm:ss');
        var c = new Reservation(input);
        console.log("running")
        return c.save().then(row => {
          return Reservation.fetchAll();;
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          }
          console.log(err);
        });
      },
      deleteReservation(root, {id}) {
        return (new Reservation({id})).destroy().then(() => {
          return Reservation.fetchAll();
        });
      },
      leaseCar(root, {id}) {
        return (new Reservation({id})).fetch().then(r => {
          r = r.serialize();
          delete r.prepaid;
          delete r.id;
          return (new Lease(r)).save().then(() => {
            return Lease.fetchAll();
          })
        })
      },
      deleteLease(root, {id}) {
        return (new Lease({id})).destroy().then(() => {
          return Lease.fetchAll();
        });
      }
    }
  }
};
