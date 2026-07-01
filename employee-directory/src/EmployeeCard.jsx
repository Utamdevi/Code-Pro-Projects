// EmployeeCard.js
import React from 'react';

export default function EmployeeCard({ employee, onSelect }) {
  // Helper to determine the specific department class
  const getDeptClass = (d) => {
    return { Engineering: "eng", Marketing: "mkt", Design: "des", HR: "hr", Finance: "fin" }[d] || "";
  };

  return (
    <div 
      className="card" 
      onClick={onSelect} 
      tabIndex={0} 
      role="button" 
      aria-label={`View profile for ${employee.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className={`avatar ${employee.avc}`}>{employee.av}</div>
      <div className="card-name">{employee.name}</div>
      <div className="card-role">{employee.role}</div>
      <span className={`card-dept ${getDeptClass(employee.dept)}`}>{employee.dept}</span>
    </div>
  );
}