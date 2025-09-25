import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplitSmartLanding from './components/SplitSmartLanding';
import SplitSmartRegistration from './components/SplitSmartRegistration';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplitSmartLanding />} />
        <Route path="/register" element={<SplitSmartRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );

}
