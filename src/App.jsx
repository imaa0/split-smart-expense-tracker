import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/useAuth';
import SplitSmartLanding from './components/SplitSmartLanding';
import SplitSmartRegistration from './components/SplitSmartRegistration';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ManagerDashboard from './components/ManagerDashboard';
import GroupExpensesDashboard from './components/GroupExpensesDashboard';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplitSmartLanding />} />
        <Route path="/register" element={<SplitSmartRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/manager/dashboard" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
        <Route path="/group/:id" element={<PrivateRoute><GroupExpensesDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );

}
