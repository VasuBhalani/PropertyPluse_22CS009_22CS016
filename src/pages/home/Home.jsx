import Searchbar from "../../components/searchbar/Searchbar";
import "./home.scss";

function Home() {
  return (

      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">The Perfect Property Awaits - Explore and Make It Yours</h1>
            <p>
            Whether you're searching for a rental or ready to make an investment, find properties tailored to your lifestyle and aspirations.
            </p>
          
          <div className="serchbar">
          <Searchbar />
          </div>
          
          <div className="boxes">
             
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
             
              <div className="box">
                <h1>200</h1>
                <h2>Award Gain</h2>
              </div>
             
              <div className="box">
                <h1>2000+</h1>
                <h2>Deals</h2>
              </div>
          
          </div>
        
        </div>
        
    </div>
    <div className="imageContainer">
          <img src="image1.jpeg"></img>
    </div>
  </div>
    
  );
}

export default Home;
