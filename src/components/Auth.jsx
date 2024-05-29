import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      if (isSignUp) {
        await signUp(emailRef.current.value, passwordRef.current.value);
      } else {
        await signIn(emailRef.current.value, passwordRef.current.value);
      }
    } catch {
      setError('Failed to sign in');
    }
  };

  return (
    <div className="auth-container"> {/* Added a class for styling */}
      <div className="auth-content">
        <h2 className="auth-title">{!isSignUp ? 'Sign In' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passwordRef} required />
          </div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <div className="toggle-sign">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? ' Sign In' : ' Sign Up'}</span>
        </div>
      </div>
    </div>
  );
}
