import React, { useState, useEffect } from 'react';
import KompEt from '../components/KompEt';
import { Link } from 'react-router-dom';
import Bjaelke from '../components/Bjaelke';
import pilVenstre from '../assets/Images/pilV.png';
import pilHøjre from '../assets/Images/pilH.png';
import BeigeTxtPic from '../components/BeigeTxtPic';
import Lis1 from '../assets/Images/LisbethLanding.jpg';
import Testimonial from '../components/Testimonial';
import testiPic from '../assets/Images/Qhvid2-lys.jpg';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../Data/firebase';
import Footer from '../components/Footer';

export const Forside = () => {
  const [carouselImages, setCarouselImages] = useState([]); // State til billeder
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Hent specifikke dokumenter fra Firestore
        const docIds = ['vintage-4', 'vintage-3', 'vintage-7'];
        const promises = docIds.map((id) =>
          getDoc(doc(db, 'Vintage', id)).then((snapshot) => ({
            src: snapshot.data()?.billede || '', // Brug feltet 'billede'
            path: '/vintage', // Link til den samme sti
          }))
        );

        const images = await Promise.all(promises);
        setCarouselImages(images);
      } catch (error) {
        console.error('Fejl ved hentning af billeder fra Firestore:', error);
      }
    };

    fetchImages();
  }, []);

  // Skift til forrige billede
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
  };

  // Skift til næste billede
  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div>
      <KompEt />
      <div className='knapDiv3'>
        <div className='knapKasse'>
          <Link className="OvalKnap MarginBtn" to="/StitchStories">Stitch_Stories</Link> 
        </div>
        <div className='knapKasse KnapMidt'>
          <Link className="OvalKnap MarginBtn" to="/Vintage">Vintage</Link> 
        </div>
        <div className='knapKasse'>
          <Link className="OvalKnap MarginBtn" to="/Upcycled">Upcycled</Link> 
        </div>
      </div>
      <Bjaelke>
          <h2 className='forside1h2'>cool is when vintage meets modern</h2>
      </Bjaelke>
      
      {/* Carousel Section */}
      <div className="carousel-container">
        <div className="carousel-content">
          <img
            src={pilVenstre}
            alt="Previous"
            className="arrow left mobil"
            onClick={goToPrevious}
          />
          <div
            className="image-container laptop"
            style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
          >
            {carouselImages.map((image, index) => (
              <Link to={image.path} key={index} className='laptop'>
                <img src={image.src} alt={`Slide ${index + 1}`} className="carousel-image laptop" />
              </Link>
            ))}
          </div>
          <div id="detaljeImgRammeForside" className='mobil'>
            <div className="produkt-carousel-wrapper forsidewrap">
              <div className="produkt-carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselImages.map((image, index) => (
                  <Link to={image.path} key={index} className="produkt-carousel-frame forsideFrame">
                    <img src={image.src} alt={`Slide ${index + 1}`} className="produkt-carousel-image ForsideKImg" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <img
            src={pilHøjre}
            alt="Next"
            className="arrow right mobil"
            onClick={goToNext}
          />
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
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
        KnapLink={<p>Læs mere</p>}
        OvalImg={Lis1}>
        {<h3>Brand filosofi</h3>}   
      </BeigeTxtPic>

      <Testimonial
        buePic={testiPic}
        TestiH2={<h2>testimonial</h2>}
        TopContent={<h2>Anna, kunde</h2>}
        BundContent={<p>Købt online</p>}
        solgt={<p>solgt</p>}
        TestiContent={<p>Når jeg kommer ind til dig, så ved jeg at det er god stil. Så har du været på jagt iblandt utallige bøjler med grimme ting og udvalgt alle skattene. Hvis jeg selv skulle på jagt, ville jeg ikke vide om den var cool or not når den hang imellem alle de andre un cool ting. Men når du har valgt den, så er jeg sikker på at den er cool</p>}
      />

      <Footer />
    </div>
  );
};

export default Forside;
