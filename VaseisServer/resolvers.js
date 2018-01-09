const moment = require('moment');

module.exports = db => {
  return {
    Query: {
      // Returns all vehicles
      vehicles(root) {
        return db.select('*').from('VEHICLES').then(rows => {
          return rows;
        });
      },
      vehicle(root, {id}) {
        return db.select('*').from('VEHICLES').where('id', id).then(rows => {
          return rows[0];
        });
      },
      department(root, {id}) {
        return db.select('*').from('DEPARTMENTS').where('id', id).then(rows => {
          return rows[0];
        });
      },
      departments(root) {
        return db.select('*').from('DEPARTMENTS').then(rows => {
          return rows;
        });
      },
      employee(root, {id}) {
        return db.select('*').from('EMPLOYEES').where('id', id).then(rows => {
          return rows[0];
        });
      },
      employees(root) {
        return db.select('*').from('EMPLOYEES').then(rows => {
          return rows;
        });
      },
      lease(root, {id}) {
        return db.select('*').from('LEASES').where('id', id).then(rows => {
          return rows[0];
        });
      },
      leases(root) {
        return db.select('*').from('LEASES').then(rows => {
          return rows;
        });
      }
    },
    Mutation: {
      // VEHICLES
      createVehicle(root, {input}) {
        input.year_bought = moment(input.year_bought).year();
        input.ins_expiration = moment(input.ins_expiration).format('YYYY/MM/DD HH:mm:ss');
        input.service_date = moment(input.service_date).format('YYYY/MM/DD HH:mm:ss');
        return db.table('VEHICLES').insert(input).returning("*").then(() => {
          db.select('*').from('VEHICLES').where('license_plate', input.license_plate).then(rows => rows[0])
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
        return db.table('VEHICLES').where('id', id).del().then(() => {
            return db.select('*').from('VEHICLES');
        });
      },
      // EMPLOYEES
      createEmployee(root, {input}) {
        return db.table('EMPLOYEES').insert(input).returning("*").then(() => {
          return db.select('*').from('EMPLOYEES').where('ssn', input.ssn).then(rows => rows[0]);
        })
        .catch(err => {
          if (err.errno == 23000) {
            // TODO: Should send data to the front here
            console.log("Duplicate Entry!");
          }
        });
      },
      deleteEmployee(root, {id}) {
        return db.table('EMPLOYEES').where('id', id).del().then(() => {
            return db.select('*').from('EMPLOYEES');
        });
      },
      // DEPARTMENTS
      createDepartment(root, {input}) {
        return db.table('DEPARTMENTS').insert(input).returning("*").then((row) => {
          return db.select('*').from('DEPARTMENTS').where('id', row[0]).then(rows => rows[0]);
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
      }
    }
  }
};
