import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Building, Briefcase, Calendar, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Generate initials for avatar
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const joinDate = user ? new Date().toLocaleDateString('en-US', {
    target: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Today';

  return (
    <div className="main-content">
      <div className="welcome-header">
        <div className="avatar">{initials}</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Here is your Creoverse Academy profile</p>
      </div>

      <div className="dashboard-grid">
        <div className="info-card">
          <div className="card-icon"><User /></div>
          <div className="card-content">
            <h3>Full Name</h3>
            <p>{user?.name}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="card-icon"><Mail /></div>
          <div className="card-content">
            <h3>Email Address</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="card-icon"><Building /></div>
          <div className="card-content">
            <h3>Organization</h3>
            <p>Creoverse Academy</p>
          </div>
        </div>

        <div className="info-card">
          <div className="card-icon"><Briefcase /></div>
          <div className="card-content">
            <h3>Domain</h3>
            <p>{user?.domain || 'MERN Stack'}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="card-content">
            <h3>Registered On</h3>
            <p>{joinDate}</p>
          </div>
        </div>

        <div className="info-card" style={{ borderColor: 'var(--secondary)' }}>
          <div className="card-content">
            <h3>Status</h3>
            <p style={{ color: 'var(--secondary)' }}>Active Intern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
