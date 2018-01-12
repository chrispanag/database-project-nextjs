module.exports = [`
  type Query {
    vehicle(id: ID!): Vehicle
    vehicles: [Vehicle],
    vehiclesAvailable(date_start: String, date_end: String): [Vehicle],
    employee(id: ID!): Employee,
    employees: [Employee]
    lease(id: ID!): Lease,
    leases: [Lease],
    department(id: ID!): Department,
    departments: [Department],
    reservation: Reservation,
    reservations: [Reservation],
    customer: Customer,
    customers: [Customer]
  }


  type Mutation {
    createVehicle(input: VehicleInput): [Vehicle],
    updateVehicle(id: ID!, input: VehicleInput): Vehicle,
    deleteVehicle(id: ID!): [Vehicle],
    createEmployee(input: EmployeeInput): [Employee],
    deleteEmployee(id: ID!): [Employee],
    createDepartment(input: DepartmentInput): Department,
    deleteDepartment(id: ID!): [Department],
    createCustomer(input: CustomerInput): [Customer],
    deleteCustomer(id: ID!): [Customer],
    createReservation(input: ReservationInput): [Reservation],
    deleteReservation(id: ID!): [Reservation],
    leaseCar(id: ID!): [Reservation],
    deleteLease(id: ID!): [Lease]
  }

  input ReservationInput {
    prepaid: Boolean,
    date_start: String,
    date_end: String,
    customer_id: ID!,
    vehicle_id: ID!,
    employee_id: ID!
  }


  input VehicleInput {
    license_plate: String,
    year_bought: String,
    damages: String,
    ins_expiration: String
    brand: String,
    type: String,
    model: String,
    hp: Int,
    cubism: Int,
    km: Int,
    service_date: String,
    department_id: ID!
  }

  input EmployeeInput {
    ssn: String,
    name: String,
    address: String,
    license: String,
    department_id: ID!
  }

  input CustomerInput {
    vat: String,
    name: String,
    address: String
  }

  input DepartmentInput {
    communication: String,
    address: String
  }

  type Department {
    id: ID!,
    communication: String,
    address: String,
    vehicles: [Vehicle],
    employees: [Employee]
  }

  type Employee {
    id: ID!,
    ssn: String,
    name: String,
    address: String,
    license: String,
    department: Department
  }

  type Customer {
    id: ID!,
    vat: String,
    address: String,
    name: String,
    date_registered: String
  }

  type Lease {
    id: ID!,
    date_start: String,
    date_end: String
  }

  type Vehicle {
    id: ID!,
    license_plate: String,
    year_bought: String,
    damages: String,
    ins_expiration: String
    brand: String,
    type: String,
    model: String,
    hp: Int,
    cubism: Int,
    km: Int,
    service_date: String,
    department: Department,
    reservations: [Reservation]
  }

  type Reservation {
    id: ID!,
    prepaid: Boolean,
    date_start: String,
    date_end: String,
    customer: Customer,
    vehicle: Vehicle,
    employee: Employee
  }

  schema {
    query: Query
    mutation: Mutation
  }`
];
