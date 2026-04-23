import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen transition-all duration-500">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
