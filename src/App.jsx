import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider  from './contexts/AuthContext';
import Auth from './components/Auth';
import Home from './components/Home';
import './App.css';
import './index.css';


// function AuthenticatedRoute({ children }) {
//   const authContext = useAuth();
//   if (authContext.isAuthenticated) return children;
//   return <Navigate to="/auth/login" />;
// }

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
