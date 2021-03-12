import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import { createEmployee } from "../actions/employeeActions";
import FormContainer from "../components/formcontainer/FormContainer";
import {
  EMPLOYEE_CREATE_RESET,
  EMPLOYEE_UPDATE_RESET,
} from "../constants/employeeConstants";

const CreateEmployeeScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const employeeCreate = useSelector((state) => state.employeeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = employeeCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EMPLOYEE_CREATE_RESET });
      history.push("/");
    }
  }, [history, dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEmployee({ name: name, email: email, password: password }));
  };

  return (
    <>
      <Link to="/">Go Back</Link>

      <FormContainer>
        <h1>Create Employee</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

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

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateEmployeeScreen;
