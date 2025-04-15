/* Build a Highly Scalable Carousel Component in React JS

Requirements:
  - We want to create a carousel component which takes array of images as input.
  - The component should efficiently handle a large number of images while maintaining
  scalability, performance optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define 
  custom behavior.
  - Focus on Accessibilitiy.
*/

import React, { useEffect, useState } from 'react'
import Carousel from './components/Carousel'

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // https://jsonplaceholder.typicode.com/photos?_limit=8

  console.log(images);

  const fetchImages = async(imgLimit) => {
    setLoading(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${imgLimit}`)
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, [])

  return (
    <div className='carousel-container'>
      <Carousel 
        images={images}
        isLoading={loading}
        // onImgClick={(image, index) => {}}
        imgPerSlide={2}
        imageLimit={4}
        customPrevButton={(onClick) => (
          <button
            className='btn prev'
            style={{background: "red"}}
            onClick={onClick}
          >
            {"<Previous"}
          </button>
        )}
        // customNextButton={}
      />
    </div>
  )
}

export default App