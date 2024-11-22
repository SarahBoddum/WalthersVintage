import React from 'react';
import { Link } from 'react-router-dom';


export const DProduktkort = ({product}) => {

  return (
    <div className='dproduktKort'>
        <h3>{product.overskrift}</h3>
        <div id='produktStreg'></div>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <img id='dproduktbillede' src={product.billede} alt={product.alt}/>
        </Link>
        <p>{product.pris}</p>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <button type='button' id='produktBtn'>Læs mere</button>
        </Link>
    </div>
  )
}
export default DProduktkort   