import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../../context/AuthContext.jsx";

function LoginForm() {
  
  // take method from AuthContext 
  const {updateUser}=useContext(AuthContext)

  // Error show karva mate aa state no use karyo chhe
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const navigate = useNavigate();
    // handle data and store in to database
    const handleLogin = async (e) => {
      
      e.preventDefault(); // refresh ne rokva mate
      setError("");
      setIsLoading(true);
      setSuccessMessage(null);

      // we will get data from input fields in form
      const formData = new FormData(e.target); 
      
      // collect data
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        const res = await apiRequest.post('/auth/login', data);

        // console.log('Success:', res);
        // localStorage.setItem("userData", JSON.stringify(res.data));
        updateUser(res.data)

        setSuccessMessage('Login successful!');

        // Wait for 3 seconds before navigating to home
        setTimeout(() => {
            navigate('/');
        }, 1500);

    } catch (err) {
        // Check if the error has a response and handle it
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error); // Display server-side error message
        } else if (err.message) {
            setError(err.message); // Display client-side error message
        } else {
            setError('Something went wrong.'); // Fallback error message
        }
    }finally{
      setIsLoading(false);
    } 
      
    }

  return (
    <div className="loginPage">
      <div className="formContainer">

      <form onSubmit={handleLogin}> 
        <div className="loginContainer">
          <h2>Login</h2>
          {error && <span className="error">{error}</span>}
          {successMessage && <span className="success">{successMessage}</span>}
          <div className="input-group">
            <div className="input-field">
               <img src="gmail.png" alt="mail" />
              <input type="email"  name="email" className="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <img src="padlock.png" alt="lock" />
              <input type="password" name="password" className="password" placeholder="Password" />
            </div>
          </div>
          <button  disabled={isLoading} className="btn btn-primary">
            {isLoading && <i className="fa fa-spinner fa-spin"></i>} Login</button>
          <div className="links">
            <Link to="/register">Don't have an account? Sign Up</Link>
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

export default LoginForm;
