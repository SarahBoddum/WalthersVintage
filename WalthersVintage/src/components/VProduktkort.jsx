import React from 'react';


export const VProduktkort = ({product}) => {

  return (
    <div className='produktKort'>
        <h3>{product.overskrift}</h3>
        <div id='produktStreg'></div>
        <img id='produktbillede' src={product.billede}/>
        <p>{product.pris}</p>
        <button id='produktBtn'>Læs mere</button>
    
    </div>
  )
}
export default VProduktkort   