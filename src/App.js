import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import EmployeeForm from "./loginpage";
import ListEmployees from "./ListEmployees";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/list" element={<ListEmployees />} />
        {/* Employee list page will go here later */}
      </Routes>
    </Router>
  );
}

export default App;
