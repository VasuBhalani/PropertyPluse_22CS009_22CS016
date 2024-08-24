import { FaUser, FaLock } from 'react-icons/fa';
import './auth.scss';

function LoginForm  (toggleForm){
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <div className="input-group">
          <span className="input-icon"><FaUser /></span>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Password" />
        </div>
        <button className="auth-button">Login</button>
        <p className="toggle-link" onClick={toggleForm}>Don't have an account? Sign up</p>
      </div>
    </div>
  );
};

export default LoginForm;
