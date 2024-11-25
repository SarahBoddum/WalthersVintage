import React, { useState } from 'react';
import KompEt from '../components/KompEt';
import { Link } from 'react-router-dom';
import Bjaelke from '../components/Bjaelke';
import image1 from '../assets/Images/QkjoleSS4.jpg';
import image2 from '../assets/Images/Hand1.jpg';
import image3 from '../assets/Images/Qkjole3.webp';
import pilVenstre from '../assets/Images/pilV.png';
import pilHøjre from '../assets/Images/pilH.png';
import BeigeTxtPic from '../components/BeigeTxtPic';
import Lis1 from '../assets/Images/placeholder1.png';
import Testimonial from '../components/Testimonial';
import testiPic from '../assets/Images/Qhvid2-lys.jpg'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import Footer from '../components/Footer';

export const Forside = () => {
  const images = [
    { src: image1, path: '/vintage' },
    { src: image2, path: '/vintage' },
    { src: image3, path: '/vintage' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  

  // Function to go to the previous image
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // Function to go to the next image
  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div>
      <KompEt />
      <div className='knapDiv3'>
        <div className='knapKasse'>
          <Link className="OvalKnap" to="/StitchStories">Stitch_Stories</Link> 
        </div>
        <div className='knapKasse KnapMidt'>
          <Link className="OvalKnap" to="/Vintage">Vintage</Link> 
        </div>
        <div className='knapKasse'>
          <Link className="OvalKnap" to="/Upcycled">Upcycled</Link> 
        </div>
      </div>
      <Bjaelke>
          <h2 className='forside1h2'>cool is when vintage meets modern</h2>
      </Bjaelke>
      
      {/* Carousel section */}
      <div className="carousel-container">
        <div className="carousel-content">
          <img
            src={pilVenstre}
            alt="Previous"
            className="arrow left mobil"
            onClick={goToPrevious}
          />
          <div
            className="image-container"
            style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
          >
            {images.map((image, index) => (
              <Link to={image.path} key={index}>
                <img src={image.src} alt={`Slide ${index + 1}`} className="carousel-image" />
              </Link>
            ))}
          </div>
          <img
            src={pilHøjre}
            alt="Next"
            className="arrow right mobil"
            onClick={goToNext}
          />
        </div>

        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <Bjaelke>
          <h2>embrace slow</h2>
      </Bjaelke>

      <BeigeTxtPic
      MidtContent={<p>Walthers Vintage er fashion og vintage i et roligt og imødekommende univers. Alt er håndvalgt, håndsyet og særligt udvalgt, så du nemt kan finde det unikke piece, du mangler. 
        <br /><br />
        Alt i butikken er valgt og lavet med respekt for den verden vi lever i og de ressourcer, vi forbruger. </p>}
        KnapLink={<p className='paddingTop'>Læs mere</p>}
        OvalImg={Lis1}>
        {<h3>Brand filosofi</h3>}   
      </BeigeTxtPic>

      <Testimonial
      buePic={testiPic}
      TestiH2={<h2>testimonial</h2>}
      TopContent={<h2>Anna, kunde</h2>}
      BundContent={<p>Købt online</p>}
      TestiContent={<p>Når jeg kommer ind til dig, så ved jeg at det er god stil. Så har du været på jagt iblandt utallige bøjler med grimme ting og udvalgt alle skattene. Hvis jeg selv skulle på jagt, ville jeg ikke vide om den var cool or not når den hang imellem alle de andre un cool ting. Men når du har valgt den, så er jeg sikker på at den er cool</p>}>

      </Testimonial>

      <Footer></Footer>
    </div>
  );
}

export default Forside;