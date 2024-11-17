import React, { useState } from 'react';
import VOBtop from '../components/VOBTop';
import vintageJakke from '../assets/Images/RjakkeV1.jpg';
import { Link } from 'react-router-dom';
import VProduktkort from '../components/VProduktkort';
import produktdata from '../Data/ProduktKort.json';
import vintageStatisk1 from '../assets/Images/placeholder2.png';


export const Vintage = () => {

  return (
    <div>
      <VOBtop
      VOBmobilH1={<h1>Vintage</h1>}
      VOBlaptopH1={<h1>vintage</h1>}
      VOBimg={vintageJakke}
      content={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}>  
      </VOBtop>

      <Link id='filtre' to="/VintageProdukt">
        
        <h2>filter</h2>
      </Link>
      <div className='filterAlle'>
        <div className="produktFlex">
          {produktdata.produktkort.slice(0, 2).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>

        <div className='statiskStemning'>
          <div className='vintageCirkel'></div>
          <img src={vintageStatisk1} alt='Udsnit af mit tøj' className='SStemningsImg'/>
        </div>
      </div>
      
    <div className="produktFlex">
        {produktdata.produktkort.slice(2, 4).map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
    </div>
    <div className="produktFlex">
        {produktdata.produktkort.slice(4, 6).map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
    </div>
    <div className="produktFlex">
        {produktdata.produktkort.slice(6, 8).map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
    </div>
    <div className="produktFlex">
        {produktdata.produktkort.slice(8, 10).map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
    </div>
    </div>
  )
}
export default Vintage