import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Register from './components/Register';
import Home from './components/Home';
import ShareList from './components/ShareList';
import './App.css';
import './index.css';

function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return children;
  return <Navigate to="/auth" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/share" element={<ShareList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
