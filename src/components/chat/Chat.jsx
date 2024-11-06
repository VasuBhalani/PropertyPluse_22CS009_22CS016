import { AuthContext } from '../../../context/AuthContext.jsx';
import { SocketContext } from '../../../context/SocketContext.jsx';
import apiRequest from '../../lib/apiRequest.js';
import './chat.scss';
import { useContext, useState } from 'react';
import  {format}  from 'timeago.js';

function Chat({chats}) {
  console.log(chats); 
  const [msg, setMsg] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);

  const handlechatBox = async (id,receiver) => {
   try{
      const res = await apiRequest("/chats/"+id);
      console.log(res.data);
      setMsg({...res.data,receiver}); 
   }catch(err){
      console.log(err);
   }  
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");
    
    if(!text) return;

    try{
         
        const res = await apiRequest.post("/messages/" + msg.id ,{text});
        setMsg(prev =>({...prev,messages:[...prev.messages,res.data]}));
        e.target.reset();
    }catch(err){
        console.log(err);}

  }

  const testSocket = () => {
    socket.emit("test", "Hello from client" );
  };


  return(
      <div className="chat">
        <div className="messages">
         <button onClick={testSocket}>test me</button>
            <h2>Message</h2>
         {chats.map((chat) => (
            <div className="msg" key={chat.id} 
            
            style={{
                backgroundColor: chat.seenBy.includes(currentUser.id)
                 ? "white" 
                 :  "#dcf8c6",
            }}
            onClick={()=>handlechatBox(chat.id,chat.receiver)}
            >
               <img src={chat.receiver.avtar || "/noavatar.jpg"} alt="user" />
               <span>{chat.receiver.username}</span>
               <p>
                  {chat.lastmessage}
               </p>
            </div>
         ))}   
        </div>
        
        {msg && <div className="chatBox">
         <div className="top">
            {console.log(msg)}
            <div className="user">
               <img src={msg.receiver.avtar || "/noavatar.jpg"} alt="user" />
               <p>{msg.receiver.username}</p>
            </div>
            <span className='close' onClick={() => setMsg(null)}>X</span>
         </div>

         <div className="center">
         {
         msg.message.map((message) => {
            const isSender = message.userId === currentUser.id;
            return (
               <div
               className={`chatMessages ${isSender ? 'sent' : 'received'}`} // Conditional class
               key={message.id}
               style={{
                  alignSelf: isSender ? "flex-end" : "flex-start",
                  textAlign: isSender ? "right" : "left",
               }}
               >
               <p>{message.text}</p>
               <span>{format(message.createdAt)}</span>
               </div>
            );
         })
         }

         </div>
         <form onSubmit={handleSubmit} className="bottom">
            <textarea className="input" placeholder="Type a message" name="text"></textarea>
            <button className="send">Send</button>
         </form>
        </div>
        }
     
      </div>
    
   )

}
 
export default Chat;
