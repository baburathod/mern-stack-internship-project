import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../api/api';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: 'Ramavath Babu', 
    email: '', 
    password: '', 
    domain: 'MERN Stack' 
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="ramavath@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Internship Domain</label>
            <select 
              className="form-select"
              value={formData.domain}
              onChange={(e) => setFormData({...formData, domain: e.target.value})}
            >
              <option value="MERN Stack">MERN Stack</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
            <UserPlus size={20} />
            Register
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
