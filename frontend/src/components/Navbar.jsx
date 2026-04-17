import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, LayoutDashboard, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <CheckSquare size={28} />
        MERN Todo
      </Link>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} style={{ display: 'inline', marginRight: '5px' }} />
          Dashboard
        </Link>
        <Link 
          to="/todos" 
          className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
        >
          <CheckSquare size={20} style={{ display: 'inline', marginRight: '5px' }} />
          My Todos
        </Link>
        <button onClick={handleLogout} className="btn danger" style={{ padding: '0.5rem 1rem', width: 'auto' }}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
