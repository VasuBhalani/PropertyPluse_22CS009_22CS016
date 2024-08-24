import './profile.scss';
import List from '../../components/list/List';
import Chat from '../../components/chat/Chat';
function Profile() {
    return (
        <div className="profilePage">
            <div className="details">
                 <div className="wrapper">
                   <div className="title">
                    <h1>User Information</h1>
                    <button>Update Profile</button>
                   </div>
                   <div className="userinfo">
                     <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user" />
                     <div className="infoText">
                        <div className="infoItem">
                            <span className="label">Username: </span>
                            <span className="value">John Doe</span>
                        </div>
                        <div className="infoItem">
                            <span className="label">Email: </span>
                            <span className="value">xhNQp@example.com</span>
                        </div>
                     </div>
                   </div>
                   <div className="title">
                    <h1>My Lists</h1>
                    <button>Add Post</button>
                   </div>
                    <div className="mylist">
                        <List/>
                    </div>
                   <div className="title">
                    <h1>Saved Lists</h1>
                   </div>
                    <List/>
                 </div>
            </div>
            <div className="chatContainer">
            <div className="wrapper">
                 <Chat/>   
              </div>
            </div>
        </div>
    );
}

export default Profile;
