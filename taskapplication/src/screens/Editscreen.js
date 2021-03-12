import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import { getEmployeeDetails, updateEmployee } from "../actions/employeeActions";
import FormContainer from "../components/formcontainer/FormContainer";
import { EMPLOYEE_UPDATE_RESET } from "../constants/employeeConstants";

const EmployeeEditScreen = ({ match, history }) => {
  const employeeId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { loading, error, employee } = employeeDetails;

  const employeeUpdate = useSelector((state) => state.employeeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = employeeUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EMPLOYEE_UPDATE_RESET });
      history.push("/");
    } else {
      if (!employee.name || employee._id !== employeeId) {
        dispatch(getEmployeeDetails(employeeId));
      } else {
        setName(employee.name);
        setEmail(employee.email);
      }
    }
  }, [employee, history, employeeId, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ _id: employeeId, name: name, email: email }));
  };

  return (
    <>
      <Link to="/">Go Back</Link>

      <FormContainer>
        <h1>Edit Employee</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EmployeeEditScreen;
