import './singlepage.scss';
import Slider from '../../components/slider/Slider.jsx';
import {singlePostData,userData} from '../../lib/dumy.js';
import Map from '../../components/map/Map.jsx';
function Singlepage({item})
{
    return(
        <div className="singlepage">
                <div className="details">
                     <div className="wrapper">
                       <Slider images={singlePostData.images}/>  {/*slider part*/} 

                       <div className="info"> {/*information part*/}
                        <div className="top">
                            <div className="post">
                                  <h1>{singlePostData.title}</h1> 
                                  <div className="address">
                                    <img src='pin.png' alt='pin'/>
                                    <span>{singlePostData.address}</span>
                                    </div>
                                    <div className="price">
                                       $  {singlePostData.price}
                                    </div>  
                            </div>

                              <div className="user">
                                <img src={userData.img} alt='user'></img>
                                <span>{userData.name}</span>
                              </div>
                        </div>
                        <div className="bottom">
                            {singlePostData.description}
                        </div>

                        </div>  
                     </div>
                </div>       

                 <div className="features"> {/*features part (right side)*/}
                    <div className="wrapper">
                        <p className="title" style={{marginTop:'20px'}}>General</p>
                        
                        <div className="listvertical">
                        <div className="feature">
                            <img src='utility.png' alt='utility'/>
                            <div className="featureText">
                                <span>Utilities</span>
                                <p>Renter is responsible</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='pet.png' alt='pat'/>
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>Pets Allowed</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='fee.png' alt='utility'/>
                            <div className="featureText">
                                <span>Property fees</span>
                                <p>Lorem ipsum dolor sit</p>
                            </div>
                        </div>
                        </div>
                        <p className="title">Sizes</p>
                        <div className="size">
                        <div className="sizes">
                            <img src='size.png' alt='size'/>
                            <span>1000 sqft</span>
                        </div>
                        <div className="sizes">
                            <img src='bed.png' alt='size'/>
                            <span>2 bed</span>
                        </div>
                        <div className="sizes">
                            <img src='bath.png' alt='size'/>
                            <span>1 bath</span>
                        </div>
                        </div>
                        <p className="title">Near by Places</p>
                        <div className="listhorizontal">
                        <div className="feature">
                            <img src='school.png' alt='School'/>
                            <div className="featureText">
                                <span>School</span>
                                <p>250m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='bus.png' alt='Bus Stop'/>
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>100m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='restaurant.png' alt='Restaurant'/>
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>500m away</p>
                            </div>
                        </div>
                        </div>
                        <p className="title">Location</p>
                        <div className="mapContainer">
                            <Map items={[singlePostData]}/>
                        </div>
                        <div className="buttons">
                            <button>
                                <img src='chat.png' alt='chat'/>
                                <span>Message</span>
                            </button>
                            <button>
                                <img src='save.png' alt='heart'/>
                                <span>Save</span>
                            </button>
                        </div>
                     </div>
                 </div>
            </div>
    )
}

export default Singlepage;
