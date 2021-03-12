import React, { useState, useEffect } from "react";
import Loader from "../components/loader/Loader";
import Message from "../components/message/Message";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees, deleteEmployee } from "../actions/employeeActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees } = employeeList;

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;

  const employeeDelete = useSelector((state) => state.employeeDelete);
  const { loading: loadingDelete, success: successDelete } = employeeDelete;

  useEffect(() => {
    dispatch(listEmployees());
    if (employeeInfo) {
      dispatch(listEmployees());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <>
      <h1>Employees</h1>

      <LinkContainer to={`/admin/employee/create`}>
        <Button variant="dark" className="btn-lg my-3 py-3">
          Create Employee +
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </td>
                <td>
                  {employee.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/employee/${employee._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(employee._id)}
                  >
                    Del
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
