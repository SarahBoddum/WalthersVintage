import React from 'react';
import { Link } from 'react-router-dom';

export const SSUC3 = ({ product, imageClassName = 'ssuc3Pic1' }) => {
  return (
    <div className='ssuctop'>
      <div id='ssuc3Pics'>
        <h2 className='mobil'>{product.overskrift}</h2>
        {/* Brug prop'en imageClassName til at kontrollere className */}
        <img src={product.billede1} alt={product.alt} className={imageClassName} />
        <div id='ssuc3PicCirkel'>
          <h2 className='laptop'>{product.overskrift}</h2>
          <h2 className='Rødtext'>{product.status}</h2>
          <div id='flex'>
            <img src={product.billede2} alt={product.alt} id='ssuc3Pic2' />
            <div id='ssuc3Cirkel'>
              <p>Pris<br />{product.pris}</p>
            </div>
          </div>
        </div>
      </div>
      <div id='ssuc3Text'>
        <p>{product.text}</p>
        <Link className='OvalKnap ssuc3Knap' to="/kontakt">Kontakt</Link>
      </div>
    </div>
  );
};

export default SSUC3;
