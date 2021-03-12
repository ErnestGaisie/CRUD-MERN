import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EmployeeListScreen from "./screens/Employeelistscreen";
import EmployeeEditScreen from "./screens/Editscreen";
import CreateEmployeeScreen from "./screens/CreateEmployeeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route
            path="/admin/employee/create"
            component={CreateEmployeeScreen}
          />
          <Route
            path="/admin/employee/:id/edit"
            component={EmployeeEditScreen}
          />

          <Route path="/" component={EmployeeListScreen} exact />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
