import React, { useEffect, useRef, useState } from "react";
import "../App.css"
const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImgClick = () => {},
  imgPerSlide = 2,
}) => {
    const imgRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);

    useEffect(() => {
        if(images.length > 0) {
            setCurrentIndex(0);
        }
    }, [images])

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === images.length-1 ? 0 : prevIndex + 1);
    };

    console.log(imgRef?.current?.offsetWidth);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{width: imgPerSlide *  imageWidth}}>
      <div className="image-contianer" style={{ transform: `translateX(-${currentIndex*imageWidth}px)`}}>
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => (<img 
            onLoad={() => setImageWidth(imgRef?.current?.offsetWidth)}
            ref={imgRef}
            height={"100%"}
            key={image.id}
            src={image.download_url}
            onClick={() => onImgClick(image, index)}
            alt={image.author + image.id}
            className="image"
          />))}
      </div>
      {customPrevButton instanceof Function ? (customPrevButton(goToPrev)) : (<button className="btn prev" onClick={goToPrev}>Prev</button>)}
      {customNextButton instanceof Function ? (customNextButton(goToNext)) : (<button className="btn next" onClick={goToNext}>Next</button>)}
      
    </div>
  );
};

export default Carousel;
