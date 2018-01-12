const moment = require('moment');

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
      vehicle(root, {id}) {
        return Vehicle.where('id', id).fetch({withRelated: ['department']}).then(v => v.attributes);
      },
      department(root, {id}) {
        return Department.where('id', id).fetch().then(d => d.attributes);
      },
      departments(root) {
        return Department.fetchAll().then(col => col.serialize());
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
        return d.save.then((row) => {
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
        return db.table('DEPARTMENTS').where('id', id).del().then(() => {
          return db.select('*').from('DEPARTMENTS');
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
        return (new Customer({id})).destroy().then(() => {
          return Customer.fetchAll();
        });
      }
    }
  }
};
