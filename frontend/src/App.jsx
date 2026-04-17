import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Todos from './pages/Todos';

// Custom Private Route Component
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Layout Routes */}
          <Route path="/" element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/todos" element={
            <PrivateRoute>
              <Navbar />
              <Todos />
            </PrivateRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
