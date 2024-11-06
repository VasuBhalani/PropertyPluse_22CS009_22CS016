import './card.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import apiRequest from '../../lib/apiRequest.js';

function Card(props) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [saved, setSaved] = useState(props.item.isSaved);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate("/login");
            return;
        }
        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/user/save", { postId: props.item.id });
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev); // Revert state if request fails
        }
    };

    return (
        <div className="card">
            <Link to={`/${props.item.id}`} className="imgContainer">
                <img src={props.item.images[0]} alt="Hello" />
            </Link>
        
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/${props.item.id}`}>{props.item.title}</Link>
                </h2>
                <p className="address">
                    <img src="pin.png" alt="location" />
                    <span>{props.item.address}</span>
                </p>
                <p className="price">
                    <span>
                        ₹ {props.item.price >= 10000000 
                            ? (props.item.price / 10000000).toFixed(2) + ' Cr' 
                            : props.item.price >= 100000 
                            ? (props.item.price / 100000).toFixed(2) + ' Lakh' 
                            : (props.item.price / 1000).toFixed(2) + ' K'}
                    </span>
                </p>  

                <div className="bottom">
                    <div className="left">
                        <div className="feature">
                            <img src="bed.png" alt="bed" />
                            <span>{props.item.bedroom} Bedroom</span>   
                        </div>   
                        <div className="feature">
                            <img src="bath.png" alt="bath" />
                            <span>{props.item.bathroom} Bathroom</span>   
                        </div>   
                    </div>
                    <div className="right">
                        <div className="icons" onClick={handleSave}>
                            <img 
                                src={saved ? "saved.png" : "save.png"} 
                                alt="save"
                            />
                        </div>
                        <div className="icons">
                            <img src="chat.png" alt="chat" />
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    );
}

export default Card;
