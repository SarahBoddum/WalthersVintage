import React from 'react';
import { Link } from 'react-router-dom';


export const VProduktkort = ({product}) => {

  return (
    <div className='produktKort'>
        <h3>{product.overskrift}</h3>
        <div id='produktStreg'></div>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <img id='produktbillede' src={product.billede}/>
        </Link>
        <p>{product.pris}</p>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <button type='button' id='produktBtn'>Læs mere</button>
        </Link>
    </div>
  )
}
export default VProduktkort   