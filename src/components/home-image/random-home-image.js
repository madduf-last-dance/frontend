import React, { useState, useEffect } from 'react';
import p1 from './home-images/p1.jpg'; 
import p2 from './home-images/p2.jpg'; 
import p3 from './home-images/p3.jpg'; 
import p4 from './home-images/p4.jpg'; 
import p5 from './home-images/p5.jpg'; 
import p6 from './home-images/p6.jpg'; 

const RandomHomeImageComponent = () => {
  const imageUrls = [p1, p2, p3, p4, p5, p6
  ];

  const [randomImageUrl, setRandomImageUrl] = useState('');

  const getRandomIndex = () => {
    return Math.floor(Math.random() * imageUrls.length);
  };

  useEffect(() => {
    const randomIndex = getRandomIndex();
    setRandomImageUrl(imageUrls[randomIndex]);
  }, []);
  console.log(imageUrls, randomImageUrl)

  return (
    <div className='home-image-container'>
      {randomImageUrl && (
        <>
          <img src={randomImageUrl} alt="Random Image" />
          <h2>Start the trip of your lifetime..</h2>
          <button className="home-image-button">Let's go!</button>
        </>
      )}
    </div>
  );
};

export default RandomHomeImageComponent;
