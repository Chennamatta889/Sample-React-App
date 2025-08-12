import React, { useState } from "react";
import "./login.css"; // Import CSS file
const BASE_URL = process.env.REACT_APP_API_URL;
function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      email,
      passwordHash: "employee", // backend will hash this anyway
      department,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`${BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const data = await response.json();
      setResult(`Employee added successfully! ID: ${data.employeeId}`);
      setName("");
      setEmail("");
      setDepartment("");
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Department:</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button type="submit">Add Employee</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default EmployeeForm;
