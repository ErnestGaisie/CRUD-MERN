import express from "express";
import {
  authEmployee,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
  createEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);
router.post("/login", authEmployee);

router
  .route("/:id")
  .delete(deleteEmployee)
  .get(getEmployeeById)
  .put(updateEmployee);

export default router;
