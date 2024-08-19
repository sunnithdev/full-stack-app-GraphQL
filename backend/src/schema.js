const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
    retirementDate: String
    daysUntilRetirement: Int
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean
    daysUntilRetirement: Int
  }

  type Query {
    getEmployees(employeeType: String): [Employee!]!
    getEmployeeById(id: ID!): Employee
    getEmployeesWithUpcomingRetirement(employeeType: String): [Employee!]!
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
