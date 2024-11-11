import React, { useState, useEffect } from 'react';
import image1 from '../assets/Images/Rjakke1.webp';
import image2 from '../assets/Images/Qkjole3.webp';
import image3 from '../assets/Images/Hand1.jpg';


const images = [image1, image2, image3];

export const KompEt = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Skifter hvert 3. sekund

        return () => clearInterval(interval); // Rydder intervallet ved unmount
    }, []);

  return (
    <div className='fuld'>
        <div className='forside'>    
            <div className='billede-cirkel'>
                <div className='Fbillede'>
                    <div className="carousel">
                        <img
                        src={images[currentIndex]}
                        alt={`carousel-image-${currentIndex}`}
                        className="carousel-image1"
                        />
                    </div>
                </div>
                <div className='cirkelBag'>
                    <p>Always <br /> One <br /> Of <br /> Of <br /> A <br /> Kind</p>
                </div>
            </div>
            <div className='WV'>
                <h1 className='F100'>WALTHERS <br />VINTAGE</h1>
            </div>
        </div>
    </div>
  )
}
export default KompEt