import './pin.scss';
import { Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
function Pin({item})
{
  //  console.log("in pin",item.latitude)
    return(
        <Marker position={[item.latitude, item.longitude]}>
        <Popup>
          <div className="popContainer">
            <img src={item.images[0]} alt="Hello"/>
            <div className="textContainer">
                <Link to={`/${item.id}`} className="link">
                    {item.title}
                </Link>
                <span className='bed'>{item.bedroom} Bedroom</span>
            <b>
              ₹ {item.price >= 10000000 
              ? (item.price / 10000000).toFixed(2) + ' Cr' 
              : item.price >= 100000 
              ? (item.price / 100000).toFixed(2) + ' Lakh' 
              : (item.price / 1000).toFixed(2) + ' K'}
            </b>
            </div>
          </div>
        </Popup>
      </Marker>
    );

}

export default Pin;