// App.js
import React, { useState } from 'react';
import { employees } from './data/employees';
import SearchBar from './SearchBar';
import EmployeeCard from './EmployeeCard';
import EmployeeModal from './EmployeeModal';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // New Sort State
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ['all', 'Engineering', 'Marketing', 'Design', 'HR', 'Finance'];

  // 1. Filter the dataset based on search queries and department chips
  let processedEmployees = employees.filter((emp) => {
    const matchesDept = activeDept === 'all' || emp.dept === activeDept;
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // 2. Sort the filtered dataset based on active sort options
  if (sortBy === 'alpha-asc') {
    processedEmployees.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'alpha-desc') {
    processedEmployees.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'default') {
    processedEmployees.sort((a, b) => a.id - b.id);
  }

  return (
    <div className="app" id="appRoot">
      <div className="bg-orb orb1"></div>
      <div className="bg-orb orb2"></div>
      <div className="bg-orb orb3"></div>

      <div className="header">
       
        <h1>Employee directory</h1>
        <p>Browse and search across all teams</p>
      </div>

      {/* Connected Search & Functional Sort Dropdown */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{processedEmployees.length}</div>
          <div className="stat-lbl">Employees</div>
        </div>
        <div className="stat">
          <div className="stat-num">5</div>
          <div className="stat-lbl">Departments</div>
        </div>
        <div className="stat">
          <div className="stat-num">3</div>
          <div className="stat-lbl">Open roles</div>
        </div>
      </div>

      <div className="dept-chips">
        {departments.map((dept) => (
          <span
            key={dept}
            className={`chip ${activeDept === dept ? 'active' : ''}`}
            onClick={() => setActiveDept(dept)}
          >
            {dept.charAt(0).toUpperCase() + dept.slice(1)}
          </span>
        ))}
      </div>

      <div className="grid">
        {processedEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onSelect={() => setSelectedEmployee(employee)}
          />
        ))}
      </div>

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}