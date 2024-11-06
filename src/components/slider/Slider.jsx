import './slider.scss';
import { useState } from 'react';

function Slider({ images }) {
  
  // console.log("images = ",images.length);

  const [imageIndex, setImageIndex] = useState(null);

  const handlePrevious = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider">
      {/* Full-screen slider */}
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={handlePrevious}>
            <img src="arrow.png" alt="Previous" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="Current Slide" />
          </div>
          <div className="arrow right" onClick={handleNext}>
            <img src="arrow.png" alt="Next" className='right' />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>X</div>
        </div>
      )}

      {/* Thumbnail images */}
      <div className="bigImage">
        <img src={images[0]} alt="Thumbnail" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImage">
        {images.slice(1).map((image, index) => (
          <img key={index} src={image} alt="Thumbnail" onClick={() => setImageIndex(index + 1)} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
