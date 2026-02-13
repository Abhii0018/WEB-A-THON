import User from "../models/model.user.js";

/**
 * Assign a random available employee
 */
export const assignRandomEmployee = async () => {
  try {
    // Get all employees
    const employees = await User.find({ role: "employee" });

    if (employees.length === 0) {
      return null; // No employees available
    }

    // Select random employee
    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex];
  } catch (error) {
    console.error("Error assigning employee:", error);
    throw error;
  }
};
