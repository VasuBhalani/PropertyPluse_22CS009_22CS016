import './chat.scss';
import { useState } from 'react';

function Chat() {
  const [msg, setMsg] = useState(' ');
   return(
      <div className="chat">
        <div className="messages">
            <h2>Message</h2>
         <div className="msg">
            <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
            <span>John Deo</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </div>
         <div className="msg">
            <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
            <span>John Deo</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </div>
         <div className="msg">
            <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
            <span>John Deo</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </div>
         <div className="msg">
            <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
            <span>John Deo</span>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
         </div>
         <div className="msg">
            <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
            <span>John Deo</span>
            <p>
                Lorem ipsum dolor sit amet.
            </p>
         </div>
        </div>
        
        {msg && <div className="chatBox">
         <div className="top">
            <div className="user">
               <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="user" />
               <p>John Deo</p>
            </div>
            <span className='close' onClick={() => setMsg(null)}>X</span>
         </div>

         <div className="center">
            <div className="chatMessages">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages own">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages own">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages own">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
            <div className="chatMessages own">
               <p>Lorem ipsum dolor sit amet.</p>
               <span>1 hour ago</span>
            </div>
         </div>
         <div className="bottom">
            <textarea className="input" placeholder="Type a message"></textarea>
            <button className="send">Send</button>
         </div>
        </div>}
     
      </div>
    
   )

}
 
export default Chat;
