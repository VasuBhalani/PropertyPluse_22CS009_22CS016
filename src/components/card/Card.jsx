import './card.scss';
import {Link} from 'react-router-dom';
// import {FaMapMarkerAlt} from 'react-icons/fa';
function Card(props)
{
    return(
    <div className="card">
        
        <Link to={`/${props.item.id}`} className='imgContainer'>
        <img src={props.item.images} alt="Hello"/>
        </Link>
   
    <div className="textContainer">
        <h2 className="title">
            <Link to={`/${props.item.id}`}>{props.item.title}</Link>
        </h2>

        <p className="address">
            <img src="pin.png" alt="location"/>
            <span>{props.item.address}</span>
        </p>
        <p className='price'><span>${props.item.price}</span></p>  

        <div className="bottom">
            <div className="left">
              <div className="feature">
                 <img src="bed.png" alt="bed"/>
                 <span>{props.item.bedroom} Bedroom</span>   
              </div>   
              
              <div className="feature">
                 <img src="bath.png" alt="bath"/>
                 <span>{props.item.bathroom} Bathroom</span>   
              </div>   
            </div>
            <div className="right">
                <div className="icons">
                    <img src="save.png" alt="save"/>
                </div>
                <div className="icons">
                    <img src="chat.png" alt="chat"/>
                </div>

                
            </div>    
        </div>  
    </div>
     
    </div>
    )
};

export default Card;
