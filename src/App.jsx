import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import EmailVerification from './pages/EmailVerification';
import useAuthStore from './store/authStore';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, [logout]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-background font-sans text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/builder/:id?" 
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
