import React from 'react';
import { Link } from 'react-router-dom';


export const UCproduktkort = ({product}) => {
  

  return (
    <div className='produktKort'>
        <h3>{product.overskrift}</h3>
        <div id='produktStreg'></div>
        <Link to={`/produkt/uc/${product.id}`} state={{ product }}>
          <img id='produktbillede' src={product.billede} alt={product.alt} loading="lazy"/>
        </Link>
        <p>Pris {product.pris} kr.</p>
        <Link to={`/produkt/uc/${product.id}`} state={{ product }}>
          <button type='button' id='produktBtn'>Læs mere</button>
        </Link>
    </div>

  )
}
export default UCproduktkort;