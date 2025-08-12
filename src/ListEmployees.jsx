import React, { useEffect, useState } from "react";
import "./ListEmployees.css";

const BASE_URL = process.env.REACT_APP_API_URL;

function ListEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = () => {
    setLoading(true);
    fetch(`${BASE_URL}/api/Employees`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employees.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      // Refresh employee list after deletion
      fetchEmployees();
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete employee.");
    }
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Created At</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{new Date(emp.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployees;
