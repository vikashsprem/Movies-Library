import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { set } from 'firebase/database';


export default function Register() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      // handle existing user case in firebase auth
      const response = await auth.signupUserbyEmailandPassword(email, password);
      setSucess('You have successfully registered. Please login to continue.');
      setTimeout(() => {
        setSucess('');
      }, 5000);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        setError("The email address is already in use.");
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  }

  return (
    <div className="auth-container px-3">
      <div className="auth-content">
        <h2 className="auth-title">Welcome to SignUp</h2>
        {error && <div className="error-message">{error}</div>}
        {sucess && <div className="sucess-message">{sucess}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required />
          </div>
          <button className='btn' type="submit">SignUp</button>
        </form>
        <div className="auth-footer flex justify-center">
          <p>If you have already an account. <span className='cursor-pointer font-semibold text-blue-800' onClick={() => navigate('/auth')}>SignIn</span></p>
        </div>
      </div>
    </div>
  );
}
