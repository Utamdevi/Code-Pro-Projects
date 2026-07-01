// App.jsx
import React from 'react';
import ActivityFeed from './components/ActivityFeed';
import './index.css';

function App() {
  return (
    <div className="dashboard-app-container">
      <ActivityFeed />
    </div>
  );
}

export default App;