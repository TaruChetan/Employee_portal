import React from "react";
import HomePage from "./components/pages/HomePage";
import FormComponent from "./components/reusableComponents/FormComponent";
import LoginForm from "./components/login/LoginForm";
import SignUp from "./components/signup/SignUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DeptMgmt from "./components/department/DeptMgmt";
import EmployeeDetails from "./components/employee/EmployeeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route
          path="/login"
          element={<FormComponent Child={<LoginForm />} />}
        />
        <Route path="/signup" element={<FormComponent Child={<SignUp />} />} />
        <Route path="/dept-mgmt/*" element={<DeptMgmt />} />
        <Route path="/emp-details" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
