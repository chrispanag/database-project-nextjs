module.exports = [`
  type Query {
    vehicle(id: ID!): Vehicle
    vehicles: [Vehicle],
    employee(id: ID!): Employee,
    employees: [Employee]
    lease(id: ID!): Lease,
    leases: [Lease],
    department(id: ID!): Department,
    departments: [Department]
  }

  type Mutation {
    createVehicle(input: VehicleInput): Vehicle,
    updateVehicle(id: ID!, input: VehicleInput): Vehicle,
    deleteVehicle(id: ID!): [Vehicle],
    createEmployee(input: EmployeeInput): Employee,
    deleteEmployee(id: ID!): [Employee],
    createDepartment(input: DepartmentInput): Department,
    deleteDepartment(id: ID!): [Department]
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
    service_date: String
  }

  input EmployeeInput {
    ssn: String,
    name: String,
    address: String,
    license: String
  }

  input DepartmentInput {
    communication: String,
    address: String
  }

  type Department {
    id: ID!,
    communication: String,
    address: String
  }

  type Employee {
    id: ID!,
    ssn: String,
    name: String,
    address: String,
    license: String
  }

  type Lease {
    id: ID!,
    date: String
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
    service_date: String
  }

  schema {
    query: Query
    mutation: Mutation
  }`
];
