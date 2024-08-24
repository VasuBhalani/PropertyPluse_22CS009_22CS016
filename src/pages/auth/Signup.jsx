import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './auth.scss';

function  SignupForm( toggleForm ){
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <div className="input-group">
          <span className="input-icon"><FaUser /></span>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <span className="input-icon"><FaEnvelope /></span>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Password" />
        </div>
        <button className="auth-button">Sign Up</button>
        <p className="toggle-link" onClick={toggleForm}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default SignupForm;
