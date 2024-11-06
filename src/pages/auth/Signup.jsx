import './signup.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest.js'; // Ensure Axios is correctly imported

function RegisterForm() {
  const navigate = useNavigate();

  // State for error, success message, and loading status
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission and store data in the database
  const handleSignup = async (e) => {
    
    e.preventDefault(); // Prevent form refresh
    setError(""); 
    setIsLoading(true);
    setSuccessMessage(null); // Reset success message

    // Collect form data
    const formData = new FormData(e.target); 
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      // Send POST request to register the user
      const res = await apiRequest.post('/auth/register', data);
      // console.log('Success:', res);
      setSuccessMessage('Registration successful!');

      // Wait for 1 second before navigating to login
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.log('Error:', err);
      // Error handling for specific fields
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;
        // Check specific error messages
        if (errors.email) {
          setError(errors.email);
        } else {
          setError('Something went wrong.');
        }
      } else {
        setError(err.message || 'Something went wrong.');
      }
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSignup}>
          <div className="registerContainer">
            <h2>Sign Up</h2>
            {error && <span className="error">{error}</span>} {/* Display specific error */}
            {successMessage && <span className="success">{successMessage}</span>}

            <div className="input-group">
              <div className="input-field">
               <img src="user.png" alt="mail" />
                <input 
                  type="text" 
                  className="username" 
                  name="username" 
                  placeholder="Username" 
                  required 
                />
              </div>
              <div className="input-field">
               <img src="gmail.png" alt="mail" />
                <input 
                  type="email" 
                  className="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                />
              </div>
              <div className="input-field">
              <img src="padlock.png" alt="lock" />                
                <input 
                  type="password" 
                  className="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                />
              </div>
            </div>
            <button disabled={isLoading} className="btn btn-primary">
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div className="links">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="imageContainer">
        <img src="image1.jpeg" alt="Background" />
      </div>
    </div>
  );
}

export default RegisterForm;
