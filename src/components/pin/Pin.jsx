import './pin.scss';
import { Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
function Pin({item})
{
    return(
        <Marker position={[item.latitude, item.longitude]}>
        <Popup>
          <div className="popContainer">
            <img src={item.images} alt="Hello"/>
            <div className="textContainer">
                <Link to={`/${item.id}`} className="link">
                    {item.title}
                </Link>
                <span className='bed'>{item.bedroom} Bedroom</span>
            <b>${item.price}</b>
            </div>
          </div>
        </Popup>
      </Marker>
    );

}

export default Pin;