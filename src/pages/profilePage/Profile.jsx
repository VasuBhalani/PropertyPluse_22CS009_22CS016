import './profile.scss';
import List from '../../components/list/List';
import Chat from '../../components/chat/Chat';
import apiRequest from '../../lib/apiRequest';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { Suspense, useContext} from 'react';
import {Link} from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.jsx';
function Profile() {
  
    const data = useLoaderData();
    // console.log(data.chatResponse);
    
    const {currentUser,updateUser}=useContext(AuthContext)
  
    const navigate = useNavigate();
    
    // logout system
    const handleLogout = async ()=>{
      try{
      await apiRequest.post('/auth/logout')
      localStorage.clear("userData");
      updateUser(null) // is equal to localStorage.clear("userData")
      navigate('/')
      }catch(e)
      {
        console.log(e);
       }
    }

    const handleUpdate = ()=>{
      navigate('/profile/update')
    }


    return (
        <div className="profilePage">
            <div className="details">
                 <div className="wrapper">
                   <div className="title">
                    <h1>User Information</h1>
                    <button onClick={handleUpdate}>Update Profile</button>
                   </div>
                   <div className="userinfo">
                     <img src={currentUser.avtar || "noavatar.jpg"} alt="user" />
                     <div className="infoText">
                        <div className="infoItem">
                            <span className="label">Username: </span>
                            <span className="value">{currentUser.username}</span>
                        </div>
                        <div className="infoItem">
                            <span className="label">Email: </span>
                            <span className="value">{currentUser.email}</span>
                        </div>
                          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                     </div>
                   </div>
                   <div className="title">
                    
                    <h1>My Lists</h1>

                    <Link to="/createPost">
                    <button>Add Post</button>
                    </Link>
                  
                   </div>
                   
                    <div className="mylist">
                    <Suspense fallback={<LoadingSpinner />}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={<p>Error loading posts!</p>}
                    >
                      {(postResponse) => {
                        // console.log(postResponse.data.userPosts); // Place console.log outside of JSX
                        return <List posts={postResponse.data.userPosts} />;
                      }}
                    </Await>
                  </Suspense>
                    </div>
                   <div className="title">
                    <h1>Saved Lists</h1>
                   </div>
                   <Suspense fallback={<LoadingSpinner/>}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={<p>Error loading posts!</p>}
                    >
                      {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                    </Await>
                  </Suspense>
                 </div>
            </div>
            <div className="chatContainer">
            <div className="wrapper">
            <Suspense fallback={<LoadingSpinner/>}>
                    <Await
                      resolve={data.chatResponse}
                      errorElement={<p>Error loading chats!</p>}
                    >
                      {(chatResponse) => {
                         console.log(chatResponse.data); // Place console.log outside of JSX
                        return <Chat chats={chatResponse.data} />;
                      }}
                    </Await>
                  </Suspense>
              </div>
            </div>
        </div>
    );
}

export default Profile;
