import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // get username

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("username"); // clear username
    navigate("/auth", { replace: true }); // navigate to Auth page
  };

  return (
    <div className="home-container">
      {/* Top bar with greeting + logout */}
      <div className="top-bar">
        <span className="greeting">Hi, {username} 👋</span>
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>

      <h1 className="home-title">Job & Company Management System</h1>
      <p className="home-subtitle">Choose a section to get started:</p>

      <div className="nav-buttons">
        <button onClick={() => navigate('/viewer')} className="nav-btn">
          🔍 View Companies & Jobs
        </button>
        <button onClick={() => navigate('/company-manager')} className="nav-btn">
          🏢 Manage Companies
        </button>
        <button onClick={() => navigate('/job-manager')} className="nav-btn">
          💼 Manage Jobs
        </button>
      </div>
    </div>
  );
}

export default HomePage;
