import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Auth() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const authenticated = await auth.loginUserbyEmailandPassword(email, password);
      if (authenticated) navigate('/');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        setError("Invalid email or password");
      }
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    console.log
  }

  return (
    <div className="auth-container px-3">
      <div className="auth-content">
        <h2 className="auth-title">SignIn</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required />
          </div>
          <button className='btn' type="submit">SignIn</button>
        </form>

        <div className="auth-footer flex justify-center">
          <p>Don't have an account? <span className='cursor-pointer font-semibold text-blue-800' onClick={()=>navigate('/signup')}>Signup</span></p>
        </div>
      </div>
    </div>
  );
}
