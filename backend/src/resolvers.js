const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    getEmployees: async (_, { employeeType }) => {
      try {
        let query = {};
        if (employeeType) {
          query = { employeeType };
        }
        const employees = await Employee.find(query);
        return employees;
      } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees');
      }
    },
    getEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        return employee;
      } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw new Error('Failed to fetch employee by ID');
      }
    },
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const employee = await Employee.create(input);
        return employee;
      } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error('Failed to create employee');
      }
    },
    updateEmployee: async (_, { id, input }) => {
      try {
        const employee = await Employee.findByIdAndUpdate(id, input, { new: true });
        return employee;
      } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Failed to update employee');
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (employee.currentStatus === true) {
          throw new Error('Cannot delete active employee');
        }
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        return deletedEmployee;
      } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete employee');
      }
    }
  }
};

module.exports = resolvers;
