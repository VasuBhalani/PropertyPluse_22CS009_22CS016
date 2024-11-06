import './updateprofile.scss';
import apiRequest from '../../lib/apiRequest'; // Ensure Axios is correctly imported
import UploadWidget from '../../components/uploadWidgets/UploadWidget.jsx';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useContext ,useState } from 'react';  
import { useNavigate } from 'react-router-dom';
function UpdateProfile() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { currentUser, updateUser } = useContext(AuthContext);
  // const [avtar,setAvtar] = useState(currentUser.avtar);
  const [avtar,setAvtar] = useState([]);

  // Handle form submission and store data in the database
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent form refresh

    const formData = new FormData(e.target); 
    const { username, email, password  } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/user/${currentUser.id}`,
         { username,
           email, 
           password,
           avtar:avtar[0] 
          });

      // Check if the response contains the updated user information
    
        updateUser(res.data); // Update the context with the new user info
        navigate('/profile'); // Navigate to profile page after update
      
    } catch (err) {
      console.log('Error:', err);
      setError(err.response?.data?.message || 'An error occurred');
    
  };

}

  return (
    <div className="updateProfilePage">
      <div className="formContainer">
        <form onSubmit={handleUpdateProfile}>
          <div className="upProfileContainer">
            <h2>Update Profile</h2>

            <div className="input-group">
              <div className="input-field">
                <img src="/user.png" alt="user" />
                <input 
                  type="text" 
                  className="username" 
                  name="username" 
                  defaultValue={currentUser.username}
                />
              </div>
              <div className="input-field">
                <img src="/gmail.png" alt="email" />
                <input 
                  type="email" 
                  className="email" 
                  name="email" 
                  defaultValue={currentUser.email}
                />
              </div>
              <div className="input-field">
                <img src="/padlock.png" alt="lock" />                
                <input 
                  type="password" 
                  className="password" 
                  name="password" 
                  placeholder="Password" 
                />
              </div>
            </div>

            <button className="btn btn-primary">Update</button>
            {error && <span className="error">{error}</span>}
          </div>
        </form>
      </div>

      <div className="imageContainer">
        <img src={avtar[0] || currentUser.avtar || "/noavatar.jpg"} alt="profile" />
       
        <UploadWidget uwConfig={{
        cloudName : "dvkqrhgu9",
        uploadPreset:"estate",
        multiple : false,
        maxImageFileSize : 2000000,
        folder:"avtars"
      }}
      setState = {setAvtar}
      />

      </div>
      
      
      
    </div>
  );
}

export default UpdateProfile;
