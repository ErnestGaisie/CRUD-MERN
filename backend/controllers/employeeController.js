import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";

//@desc Auth employee
//@route POST /api/employees/login
//@access Public
const authEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email: email });

  // match password is a function in the employeemodel to decrypt the password to hash format and compare
  if (employee && (await employee.matchPassword(password))) {
    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      isAdmin: employee.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get all employees
//@route GET /api/employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});
  res.json(employees);
});

//@desc Delete employee
//@route DELETE /api/employees/:id

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    await employee.remove();
    res.json({ message: "Employee removed" });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//@desc Get employees by ID
//@route GET /api/employees/:id

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id).select("-password");

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//@desc Update employee
//@route PUT /api/employees/:id

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  console.log("GAISIE");
  console.log(req.body);
  console.log("GAISIE");

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;

    const updatedEmployee = await employee.save();

    res.json({
      _id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
    });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//@desc Create a new employee
//@route POST /api/employees
//@access Public
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const employeeExists = await Employee.findOne({ email: email });

  if (employeeExists) {
    res.status(400);
    throw new Error("User already exists ");
  }

  const employee = await Employee.create({
    name: name,
    email: email,
    password: password,
  });

  if (employee) {
    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export {
  authEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  createEmployee,
};
